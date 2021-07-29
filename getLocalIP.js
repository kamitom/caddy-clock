/**
 * Get Local IP Address
 *
 * @returns Promise Object
 *
 * getLocalIP().then((ipAddr) => {
 *    console.log(ipAddr); // 192.168.0.122
 * });
 */
function getLocalIP () {
  return new Promise(function (resolve, reject) {
    // NOTE: window.RTCPeerConnection is "not a constructor" in FF22/23
    const RTCPeerConnection = /* window.RTCPeerConnection || */ window.webkitRTCPeerConnection || window.mozRTCPeerConnection

    if (!RTCPeerConnection) {
      reject('Your browser does not support this API')
    }

    const rtc = new RTCPeerConnection({ iceServers: [] })
    const addrs = {}
    addrs['0.0.0.0'] = false

    function grepSDP (sdp) {
      const hosts = []
      let finalIP = ''
      sdp.split('\r\n').forEach(function (line) { // c.f. http://tools.ietf.org/html/rfc4566#page-39
        if (~line.indexOf('a=candidate')) { // http://tools.ietf.org/html/rfc4566#section-5.13
          var parts = line.split(' ') // http://tools.ietf.org/html/rfc5245#section-15.1
          var addr = parts[4]
          const type = parts[7]
          if (type === 'host') {
            finalIP = addr
          }
        } else if (~line.indexOf('c=')) { // http://tools.ietf.org/html/rfc4566#section-5.7
          var parts = line.split(' ')
          var addr = parts[2]
          finalIP = addr
        }
      })
      return finalIP
    }

    if (1 || window.mozRTCPeerConnection) { // FF [and now Chrome!] needs a channel/stream to proceed
      rtc.createDataChannel('', { reliable: false })
    };

    rtc.onicecandidate = function (evt) {
      // convert the candidate to SDP so we can run it through our general parser
      // see https://twitter.com/lancestout/status/525796175425720320 for details
      if (evt.candidate) {
        const addr = grepSDP('a=' + evt.candidate.candidate)
        resolve(addr)
      }
    }
    rtc.createOffer(function (offerDesc) {
      rtc.setLocalDescription(offerDesc)
    }, function (e) { console.warn('offer failed', e) })
  })
}
