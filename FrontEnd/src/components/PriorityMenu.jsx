// import * as React from 'react';
// import Box from '@mui/material/Box';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// // import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


// export default function BasicPrioritySelect({value,onChange}) {

//   return (
//     <Box sx={{ minWidth: 100 }}>
//       <FormControl fullWidth>
//         <InputLabel id="priority-select-label">Priority</InputLabel>
//         <Select
//           labelId="priority-select-label"
//           id="priority-select"
//           value={value}
//           label="Priority"
//           onChange={(e)=>onChange(e.target.value)}
//           // renderValue={(selected) => (
//           //   <Box sx={{ display: 'flex', alignItems: 'center' }}>
//           //     <span>{selected}</span>
//           //     <ArrowDropDownIcon sx={{ marginLeft: 1 }} />
//           //   </Box>
//           // )}
//         >
//           <MenuItem value="High">High</MenuItem>
//           <MenuItem value="Medium">Medium</MenuItem>
//           <MenuItem value="Low">Low</MenuItem>
//           <MenuItem value="Default">None</MenuItem>
//         </Select>
//       </FormControl>
//     </Box>
//   );
// }

//Original Code


import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import IconButton from '@mui/material/IconButton';



export default function BasicPrioritySelect({ value, onChange }) {

  return (
    <Box sx={{ minWidth: 100 }}>
      <FormControl fullWidth>
      <InputLabel id="priority-select-label">Priority</InputLabel>
        <Select
          labelId="priority-select-label"
          id="priority-select"
          value={value}
          label="Priority"
          onChange={(e) => onChange(e.target.value)}
          IconComponent={(props) => (
            <IconButton {...props} className="icon-button priority-icon">
              <ArrowDropDownIcon />
            </IconButton>
          )}
          >

          <MenuItem value="🔴">High 🔴</MenuItem>
          <MenuItem value="🟡">Medium 🟡</MenuItem>
          <MenuItem value="🔵">Low 🔵</MenuItem>
          <MenuItem value="">No Priority⚪️</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}


//Vishnu


// import * as React from 'react';
// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';

// export default function BasicPrioritySelect({ value, onChange }) {
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <div>
//       <Button
//         id="demo-positioned-button"
//         aria-controls={open ? 'demo-positioned-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         🔻
//       </Button>
//       <Menu
//         id="demo-positioned-menu"
//         aria-labelledby="demo-positioned-button"
//         anchorEl={anchorEl}
//         open={open}
//         value={value}
//         onChange={(e) => onChange(e.target.value)}
//         onClose={handleClose}
//         anchorOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//         transformOrigin={{
//           vertical: 'top',
//           horizontal: 'left',
//         }}
//       >
//         <MenuItem value="High" onClick={handleClose}>High</MenuItem>
//         <MenuItem value="Medium" onClick={handleClose}>Medium</MenuItem>
//         <MenuItem value="Low" onClick={handleClose}>Low</MenuItem>
//         <MenuItem value="Default" onClick={handleClose}>Default</MenuItem>
//       </Menu>
//     </div>
//   );
// }