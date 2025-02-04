import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Design from './Design';
import { StyledTypography } from './styles';
import CompareResults from './Component/Compare';
import Results from './Result';
import Trends from './Component/Trends';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

export default function TabsPanel({rootId,tab,runId}) {
  const theme = useTheme();
  const [value, setValue] = useState(tab?tab:'Design');
  console.log('tab',tab?'yes':'no')
  // useEffect(()=>{
  //   if( tab !== undefined)
  //     setValue(tab)
  // },[tab])

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <Box >
     
      <Tabs
         value={value}
         onChange={handleChange}
        
         sx={{
           '& .MuiTabs-indicator': {
             backgroundColor: 'rgb(101, 77, 247)'
           },
           '& .Mui-selected': {
             color: 'rgb(101, 77, 247)'
           }
         }}
        >
          <Tab value="Design" label={<StyledTypography style={{ textTransform: 'capitalize' }}>Design</StyledTypography>}/>
          <Tab value="Results" label={<StyledTypography style={{ textTransform: 'capitalize' }}>Results</StyledTypography>} />
          <Tab value="Trends" label={<StyledTypography style={{ textTransform: 'capitalize' }}>Trends</StyledTypography>} />
          <Tab value="CompareResults" label={<StyledTypography style={{ textTransform: 'capitalize' }}>Compare Results</StyledTypography>} />
        </Tabs>
     
      {/* <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      > */}
        <TabPanel value={value} index={'Design'} dir={theme.direction}>
        <Design rootId={rootId}/>
        </TabPanel>
        <TabPanel value={value} index={"Results"} dir={theme.direction}>
        <Results rootId={rootId} openedAccord={runId}/>
        </TabPanel>
        <TabPanel value={value} index={"Trends"} dir={theme.direction}>
        <Trends/>
        </TabPanel> 
        <TabPanel value={value} index={"CompareResults"} dir={theme.direction}>
        <CompareResults/>
        </TabPanel>
      {/* </SwipeableViews> */}
    </Box>
  );
}