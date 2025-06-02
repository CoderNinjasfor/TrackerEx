import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { Box, Typography, useTheme } from '@mui/material'; // useTheme can still be useful for conditional text/bg
import PropTypes from 'prop-types';

export default function ExpensePieChart({ data }) {
  const theme = useTheme(); // Get theme for potential subtle adjustments if needed

  if (!data || data.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
          minHeight: '250px', // Same minHeight as your Recharts placeholder
          backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[100],
          borderRadius: '4px',
          p: 2,
        }}
      >
        {/* You can use an MUI icon here for consistency */}
        <svg className="w-16 h-16 mb-2" fill={theme.palette.text.secondary} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="0.5" d="M9 17v-2a4 4 0 00-4-4H3V9a4 4 0 004-4h2a4 4 0 004 4v2m-4 4h2a4 4 0 004-4v-2m0 0V9a4 4 0 00-4-4H9M9 17H7A4 4 0 013 13V9m18 4v-2a4 4 0 00-4-4h-2a4 4 0 00-4 4v2m0 4h2a4 4 0 004-4m0 0v-2m2 2h-2m2-2a4 4 0 01-4 4h-2m0-4V9m0 0H9"></path></svg>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>
          No expense data available for the chart.
        </Typography>
      </Box>
    );
  }

  // Prepare data for MUI X PieChart
  // It expects an array of objects, each with at least 'id', 'value', and 'label'.
  // You can also provide 'color'.
  const chartData = data.map((item, index) => ({
    id: item.id || index, // Use item.id if it exists, otherwise use index as a fallback
    value: item.value,
    label: item.name,
    // color: COLORS[index % COLORS.length], // Optional: if you want to manually set colors
  }));

  return (
     <Box sx={{ 
        width: '100%', 
        height: 300,
        // Target the SVG text elements within the legend series items
        '& .MuiChartsLegend-series text': { 
            fill: `${theme.palette.text.primary} !important` 
        },
        // You might also need to style the legend item root if it has other text elements
        // '& .MuiChartsLegend-label': {
        //   color: `${theme.palette.text.primary} !important`,
        // }
    }}>
    <PieChart
        series={[
          {
            data: chartData,
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        // Remove labelStyle from slotProps.legend if it's causing the warning
        slotProps={{
          legend: {
            // Remove labelStyle or ensure it's an empty object if it doesn't error out
            // labelStyle: {}, // Test if an empty object is fine
          }
        }}
        tooltip={{ trigger: 'item', content: (props) => <CustomTooltip {...props} theme={theme} /> }}
      />
    </Box>
  );
}

ExpensePieChart.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // Optional id
      name: PropTypes.string.isRequired, // Will be used as label
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};