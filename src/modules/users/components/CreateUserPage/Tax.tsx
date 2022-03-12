import { Checkbox, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { CreateUserPageComProps } from './MainInfo';

const Tax = (props: CreateUserPageComProps) => {
  const { control } = props;
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#1b1b38',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '20px',
        marginTop: '20px',
      }}
    >
      <Typography variant="h5" sx={{ color: 'white', marginLeft: '18px', marginTop: '8px' }}>
        Tax information
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 0' }}>
        <Typography className="label_input_add_user">Tax exempt</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="taxExempt"
            defaultValue={0}
            render={({ field: { value, onChange, ...props } }) => (
              <Checkbox
                style={{ color: 'white', width: '10%' }}
                onChange={(e, checked) => {
                  if (checked) onChange(1);
                  else onChange(0);
                }}
                value={value}
                checked={value === 1}
                {...props}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Tax;
