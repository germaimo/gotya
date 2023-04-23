// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// export default function handler(req, res) {
//   res.status(200).json({ name: 'John Doe', age: 30  })
// }

// const abletonParser = require('ableton-parser');

// abletonParser.parseFile('../2canales-midi-audio-sinclips.als').then((res) => {
    
//     const arrayTracks = res.getTracks();
    
//     arrayTracks[0].AudioTrack.forEach(element => {
//         console.log(element.Name[0].EffectiveName[0].$.Value);
//     });

//     arrayTracks[0].MidiTrack.forEach(element => {
//         console.log(element.Name[0].EffectiveName[0].$.Value);
//     });
  
// });

const abletonParser = require('ableton-parser');

export default async function handler(req, res) {
  try {
    const { file } = req.body;

    console.log('eu')

    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log('hola soy data')

    //const buffer = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
    // Assuming the uploaded file is in base64 format, decode it into a buffer.

    // abletonParser.parseFile(buffer).then((res) => {
    //   const arrayTracks = res.getTracks();
    
    //   arrayTracks[0].AudioTrack.forEach(element => {
    //     console.log(element.Name[0].EffectiveName[0].$.Value);
    //   });

    //   arrayTracks[0].MidiTrack.forEach(element => {
    //     console.log(element.Name[0].EffectiveName[0].$.Value);
    //   });
  
    //   res.status(200).json({ message: "File processed successfully" });
    // });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
