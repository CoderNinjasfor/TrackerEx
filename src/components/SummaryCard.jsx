import { Card, CardContent, Typography, Box } from '@mui/material';
import PropTypes from 'prop-types';

export default function SummaryCard({ title, value, icon, color = 'text.secondary' }) {
  return (
    <Card sx={{ minWidth: 200, flexGrow: 1 }}>
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <Box>
            <Typography color="text.secondary" gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" component="div">
              {typeof value === 'number' ? `$${value.toFixed(2)}` : value}
            </Typography>
          </Box>
          {icon && <Box sx={{ color: color, fontSize: '2.5rem' }}>{icon}</Box>}
        </Box>
      </CardContent>
    </Card>
  );
}

SummaryCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.element,
  color: PropTypes.string,
};