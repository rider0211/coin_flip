import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

export default function Wagering({ wagering, setWagering }) {
  return (
    <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={wagering}
        onChange={(e) => setWagering(e.target.value)}
      >
        <FormControlLabel value={"heads"} control={<Radio />} label="Heads" />
        <FormControlLabel value={"tails"} control={<Radio />} label="Tails" />
      </RadioGroup>
    </FormControl>
  );
}
