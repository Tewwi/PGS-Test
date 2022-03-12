import { Checkbox, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { accessLevel, membershipsUser } from '../../util';
import { CreateUserPageComProps } from './MainInfo';

const AccessInfo = (props: CreateUserPageComProps) => {
  const { control, error } = props;
  const required = { required: { value: true, message: 'This field is requierd' } };

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
        Access information
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 0' }}>
        <Typography className="label_input_add_user" noWrap>
          Access level<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="access_level"
            rules={required}
            defaultValue={accessLevel[0].value}
            render={({ field }) => (
              <select {...field} className="field_input">
                {accessLevel.map((item) => {
                  return (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            )}
          />
          <Typography className="error_message">{error?.access_level ? error?.access_level?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 0' }}>
        <Typography className="label_input_add_user" noWrap>
          Membership
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            defaultValue={''}
            name="membership_id"
            render={({ field }) => (
              <select {...field} className="field_input">
                {membershipsUser.map((item) => {
                  return (
                    <option key={item.value} value={item.value || ''}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 0' }}>
        <Typography className="label_input_add_user">Require to change password on next log in</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="forceChangePassword"
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

export default AccessInfo;
