import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';
import { NavigateNext } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Breadcrumbs = ({ items }) => {
  const navigate = useNavigate();

  return (
    <MUIBreadcrumbs separator={<NavigateNext fontSize="small" />} sx={{ mb: 2 }}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        
        return isLast ? (
          <Typography key={item.label} color="text.primary" fontWeight="medium">
            {item.label}
          </Typography>
        ) : (
          <Link
            key={item.label}
            underline="hover"
            color="inherit"
            onClick={() => navigate(item.path)}
            sx={{ cursor: 'pointer' }}
          >
            {item.label}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
