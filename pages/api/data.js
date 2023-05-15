import abletonParser from 'ableton-parser';

export default async function handler(req, res) {
  console.log(req.body);

  // const { url } = req.query;

  try {
    const data = await abletonParser.parseFile("https://firebasestorage.googleapis.com/v0/b/gotya-c34a0.appspot.com/o/proyectosals%2Fableton-2canales-midi-audio-sinclips.als");
   //console.log(data)
   
    const audioTrackNames = data.getTracks()[0].AudioTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
    const midiTrackNames = data.getTracks()[0].MidiTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);

    res.status(200).json({ audioTrackNames, midiTrackNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  
  }

}
