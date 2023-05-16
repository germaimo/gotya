import formidable from 'formidable';
import abletonParser from 'ableton-parser';

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    const file = files['file'];
    if (!file) {
      res.status(400).json({ error: 'No file was uploaded' });
      return;
    }
    try {
      const data = await abletonParser.parseFile(file.path);
      const audioTrackNames = data.getTracks()[0].AudioTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
      const midiTrackNames = data.getTracks()[0].MidiTrack.map((track) => track.Name[0].EffectiveName[0].$.Value);
      res.status(200).json({ audioTrackNames, midiTrackNames });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    } finally {
      res.end();
    }
  });

  res.on('close', () => {
    // liberar recursos
  });
}