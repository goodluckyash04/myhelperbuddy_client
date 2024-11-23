import * as React from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { ButtonBase, CardActions, Divider } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconEdit, IconLogout } from '@tabler/icons-react';
import { useNavigate } from 'react-router';

export default function ProductCard() {
  const navigate = useNavigate();
  const onCardClick = () => navigate('/utils/finance/details?id=2');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column', // Stack the items vertically
        width: '100%',
        padding: 2, // Add padding to the box
        '@media (max-width: 600px)': {
          padding: 1 // Less padding on smaller screens
        }
      }}
    >
      <ButtonBase onClick={onCardClick}>
        <Card
          sx={{
            boxShadow: 2,
            backgroundColor: '#e2d7be',
            alignItems: 'center',
            color: 'grey.800',
            width: '100%',
            maxWidth: 400, // Limit the card width on larger screens
            '@media (max-width: 600px)': {
              maxWidth: '90%' // On small screens, set width to 90%
            }
          }}
          variant="outlined"
        >
          <CardContent sx={{ justifyItems: 'start' }}>
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              Loan
            </Typography>
            <Typography variant="h5" component="div" color={'#54544b'}>
              Moto Edge 30 Fusion
            </Typography>
            <Typography sx={{ color: 'green', mb: 1.5 }}>Active</Typography>
            <Typography variant="caption">Nov 2024 - Dec 2025</Typography>
            <Typography variant="h6">₹ 12000 | 35000</Typography>
            <Typography variant="subtitle2">7 | 12</Typography>
          </CardContent>
          <Divider sx={{ mx: 2 }} />
          <CardActions
            sx={{
              py: 1,

              display: 'flex',
              flexWrap: 'wrap', // Allow buttons to wrap to the next line on smaller screens
              '@media (max-width: 600px)': {
                flexDirection: 'column' // Stack buttons vertically on small screens
              }
            }}
          >
            <IconButton aria-label="edit">
              <IconLogout />
            </IconButton>
            <IconButton aria-label="edit">
              <IconEdit />
            </IconButton>
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </CardActions>
        </Card>
      </ButtonBase>
    </Box>
  );
}
