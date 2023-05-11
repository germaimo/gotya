import abletonParser from 'ableton-parser';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const data = await abletonParser.parseFile(url);
    const audioTrackNames = data.getTracks()[0].AudioTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
    const midiTrackNames = data.getTracks()[0].MidiTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);

    res.status(200).json({ audioTrackNames, midiTrackNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  
  }

}
