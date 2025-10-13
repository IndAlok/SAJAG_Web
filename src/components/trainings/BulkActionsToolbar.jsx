import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Delete,
  Edit,
  CheckCircle,
  Cancel,
  MoreVert,
  Download,
  Email,
  Print,
} from '@mui/icons-material';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BulkActionsToolbar = ({ 
  selectedCount, 
  onDelete, 
  onStatusUpdate, 
  onExport,
  onClearSelection,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAction = (action) => {
    handleClose();
    action();
  };

  return (
    <AnimatePresence>
      {selectedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              background: (theme) =>
                theme.palette.mode === 'dark'
                  ? 'linear-gradient(135deg, rgba(37, 99, 235, 0.15) 0%, rgba(124, 58, 237, 0.15) 100%)'
                  : 'linear-gradient(135deg, rgba(37, 99, 235, 0.08) 0%, rgba(124, 58, 237, 0.08) 100%)',
              border: 1,
              borderColor: 'primary.main',
            }}
          >
            <Chip
              label={`${selectedCount} Selected`}
              color="primary"
              size="medium"
              sx={{ fontWeight: 'bold' }}
            />

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', flex: 1 }}>
              <Button
                size="small"
                startIcon={<CheckCircle />}
                variant="outlined"
                color="success"
                onClick={() => handleAction(() => onStatusUpdate('Completed'))}
              >
                Mark Completed
              </Button>

              <Button
                size="small"
                startIcon={<Cancel />}
                variant="outlined"
                color="warning"
                onClick={() => handleAction(() => onStatusUpdate('Cancelled'))}
              >
                Cancel
              </Button>

              <Button
                size="small"
                startIcon={<Download />}
                variant="outlined"
                onClick={() => handleAction(onExport)}
              >
                Export Selected
              </Button>

              <Button
                size="small"
                startIcon={<Delete />}
                variant="outlined"
                color="error"
                onClick={() => {
                  if (window.confirm(`Delete ${selectedCount} selected training(s)?`)) {
                    handleAction(onDelete);
                  }
                }}
              >
                Delete
              </Button>

              <Button
                size="small"
                startIcon={<MoreVert />}
                variant="outlined"
                onClick={handleClick}
              >
                More
              </Button>
            </Box>

            <Button
              size="small"
              variant="text"
              onClick={onClearSelection}
            >
              Clear Selection
            </Button>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={() => handleAction(() => onStatusUpdate('In-Progress'))}>
                <ListItemIcon>
                  <CheckCircle fontSize="small" color="info" />
                </ListItemIcon>
                <ListItemText>Mark In-Progress</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction(() => onStatusUpdate('Pending Approval'))}>
                <ListItemIcon>
                  <CheckCircle fontSize="small" color="warning" />
                </ListItemIcon>
                <ListItemText>Mark Pending Approval</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction(() => alert('Email notification sent!'))}>
                <ListItemIcon>
                  <Email fontSize="small" />
                </ListItemIcon>
                <ListItemText>Send Notifications</ListItemText>
              </MenuItem>
              <MenuItem onClick={() => handleAction(() => window.print())}>
                <ListItemIcon>
                  <Print fontSize="small" />
                </ListItemIcon>
                <ListItemText>Print Reports</ListItemText>
              </MenuItem>
            </Menu>
          </Paper>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BulkActionsToolbar;
