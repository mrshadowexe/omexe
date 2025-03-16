const videoCallButton = document.getElementById("videoCall");
const voiceCallButton = document.getElementById("voiceCall");
const localVideo = document.getElementById("localVideo");
const remoteVideo = document.getElementById("remoteVideo");

let peerConnection;
const config = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

videoCallButton.addEventListener("click", startVideoCall);
voiceCallButton.addEventListener("click", startVoiceCall);

async function startVideoCall() {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = stream;
    initiateCall(stream);
}

async function startVoiceCall() {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    initiateCall(stream);
}

function initiateCall(stream) {
    peerConnection = new RTCPeerConnection(config);
    stream.getTracks().forEach(track => peerConnection.addTrack(track, stream));

    peerConnection.ontrack = event => {
        remoteVideo.srcObject = event.streams[0];
    };

    peerConnection.onicecandidate = event => {
        if (event.candidate) {
            console.log("New ICE candidate:", event.candidate);
        }
    };
}
