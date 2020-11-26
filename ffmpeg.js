//it needs fluent-ffmpeg

var ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const path = require('path');

//TODO: get files from URL (to be checked, for later)
//TODO: don't use hardcoded files, ask for input

var audiofile = './webcams.mp4';
var full_path_audio = path.resolve(audiofile);

var command = ffmpeg(full_path_audio);

var audiofiledemux = './test.aac';
var full_path_audio = path.resolve(audiofiledemux);

var videofile = './deskshare.mp4';
var full_path_video = path.resolve(videofile);

var out_file = './out.mp4';
var full_path_out = path.resolve(out_file);

console.log(full_path_audio);

//check if files are present
while (!fs.existsSync(full_path_audio) &&!fs.existsSync(full_path_video)) {
    console.log(`waiting for ${videofile} and ${audiofile}`);
}
//TODO: ask for input to start 

//strip audio
let getAudio = () => {
    command.outputOptions([
        '-vn',
        '-acodec copy',
    ]).save('test.aac');
    console.log('audio?');
}

//get audio
if (!fs.existsSync(full_path_audio)) {
    getAudio();
}

// Wait for file to exist, checks every 2 seconds
function getFile(path, timeout) {
     timeout = setInterval(function() {

        const file = path;
        const fileExists = fs.existsSync(file);

        console.log('Checking for: ', file);
        console.log('Exists: ', fileExists);

        if (fileExists) {
            clearInterval(timeout);
            mergeMedia(full_path_audio, full_path_video, full_path_out, function (err) {
                if (!err) {
                    console.log('Job completed');
                }
            });
        }
    }, timeout);
};

getFile(full_path_audio, 2);

//merge media function definition
function mergeMedia(aud, vid, output, callback) {

    ffmpeg()
        .input(aud)
        .input(vid)
        .output(output)
        .outputOptions(
            '-c', 'copy',
        ).on('end', function () {
            console.log('Muxing done');
            callback(null);
        }).on('error', function (err) {
            console.log('error: ', err);
            callback(err);
        }).run();

}