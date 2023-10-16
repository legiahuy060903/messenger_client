import moment from "moment";

export const pic = 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/640px-Facebook_Messenger_logo_2020.svg.png';

const now = moment();

export const formatTimeAgo = (timestamp) => {

}
export const handleTimeChat = (timestamp) => {
    const now = moment();
    const time = moment(timestamp);
    const hours = now.diff(time, 'hours');
    if (hours < 24) {
        return time.format('HH:mm');
    }
    return time.format('DD/MM/YYYY')
}

export const formatByTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
};

export const playStream = (tag, stream) => {
    let video = tag;
    video.srcObject = stream;
    video.addEventListener('loadedmetadata', () => {
        video.play();
    });
};

export const openStream = (video) => {
    const config = { audio: true, video }
    return navigator.mediaDevices.getUserMedia(config)
};

export const playAudio = (newAudio) => {
    if (newAudio.paused || newAudio.ended) {
        const playPromise = newAudio?.play();
    } else {
        console.log('Audio is already playing or paused');
    }
};

export const pauseAudio = (newAudio) => {
    newAudio.pause()
    newAudio.currentTime = 0
};