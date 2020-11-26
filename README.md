# HYF_small_video_utility

A little  script used to convert the lesson of HYF available on [openknowledge.be](https://meet.openknowledge.be/playback/presentation/2.0/playback.html?meetingId=48966e92bc14f80c53d450f9e59dc77e812b2f8b-1605437686426)

### two files are needed to run this script:

[webcams.mp4](https://meet.openknowledge.be/presentation/48966e92bc14f80c53d450f9e59dc77e812b2f8b-1605437686426/video/webcams.mp4)

`document.getElementById("video").getElementsByTagName("source")[1].src`

and [deskshare-video](https://meet.openknowledge.be/presentation/48966e92bc14f80c5…d450f9e59dc77e812b2f8b-1605437686426/deskshare/deskshare.mp4)

`document.getElementById("deskshare-video").getElementsByTagName("source")[1].src`

The first file has also the audio to be extracted and merged to the second file.

Node, npm and fluent-ffmpeg are required, to run the script:
`node ffmpeg.js `
