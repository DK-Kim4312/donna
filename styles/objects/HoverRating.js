import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    1: 'Chillin',
    2: 'No Rush',
    3: 'Okay',
    4: 'Beast Mode',
    5: 'See you in the next life',
};

function getLabelText(value) {
    return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}


export default function HoverRating({ label, level, onChange }) {
    const [value, setValue] = React.useState(level);
    const [hover, setHover] = React.useState(-1);

    return (
        <Box
            sx={{
                width: 200,
                display: 'inline-flex',
                alignItems: 'center',
                textWrap: 'nowrap',
            }}
        >
            <p className='mr-2'>{label}</p>
            <Rating
                name="hover-feedback"
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                    setValue(newValue);
                    onChange(newValue);
                }}
                onChangeActive={(event, newHover) => {
                    setHover(newHover);
                }}
                emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
            />
            {value !== null && (
                <Box sx={{ ml: 2 }} >{labels[hover !== -1 ? hover : value]}</Box>
            )}
        </Box>
    );
}