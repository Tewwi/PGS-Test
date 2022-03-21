import { Typography } from '@mui/material';
import React from 'react';
import { Control, Controller, UseFormWatch } from 'react-hook-form';
import { newUser } from '../../../../models/userList';
import { validEmailRegex } from '../../../../utils';
import { paymentRailsType } from '../../util';

export interface CreateUserPageComProps {
  control: Control<newUser, any>;
  error?: any;
  watch: UseFormWatch<newUser>;
  isDetail?: boolean;
}

const MainInfo = (props: CreateUserPageComProps) => {
  const { control, error, watch, isDetail } = props;
  const required = { required: { value: true, message: 'This field is requierd' } };

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#1b1b38',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '20px',
      }}
    >
      <Typography variant="h6" sx={{ color: 'white', marginLeft: '18px', marginTop: '8px' }}>
        {`Email ${'&'}  password`}
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user">
          First Name<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="firstName"
            defaultValue={''}
            rules={required}
            render={({ field }) => <input {...field} className="field_input" type="text" />}
          />
          <Typography className="error_message">{error?.firstName ? error?.firstName?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user">
          Last Name<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="lastName"
            defaultValue={''}
            rules={required}
            render={({ field }) => <input {...field} className="field_input" type="text" />}
          />
          <Typography className="error_message">{error?.lastName ? error?.lastName?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user">
          Email<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="email"
            defaultValue={''}
            rules={{
              required: { value: true, message: 'This field is requierd' },
              pattern: { value: validEmailRegex, message: 'Email is invalid' },
            }}
            render={({ field }) => <input {...field} className="field_input" type="email" />}
          />
          <Typography className="error_message">{error?.email ? error?.email?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user">
          Password<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="password"
            defaultValue={''}
            rules={
              !isDetail
                ? {
                    required: { value: true, message: 'This field is requierd' },
                    minLength: { value: 6, message: 'Password must have at least 6 characters' },
                  }
                : { minLength: { value: 6, message: 'Password must have at least 6 characters' } }
            }
            render={({ field }) => <input {...field} className="field_input" type="password" />}
          />
          <Typography className="error_message">{error?.password ? error?.password?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Confirm Password<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="confirm_password"
            defaultValue={''}
            rules={
              !isDetail
                ? {
                    required: { value: true, message: 'This field is requierd' },
                    validate: { value: (value) => value === watch('password') || 'The passwords do not match' },
                  }
                : { validate: { value: (value) => value === watch('password') || 'The passwords do not match' } }
            }
            render={({ field }) => <input {...field} className="field_input" type="password" />}
          />
          <Typography className="error_message">
            {error?.confirm_password ? error?.confirm_password?.message : ''}
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Type
        </Typography>
        {!isDetail ? (
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
            <Controller
              control={control}
              name="paymentRailsType"
              defaultValue={paymentRailsType[0]}
              render={({ field }) => (
                <select {...field} style={{ textTransform: 'capitalize' }} className="field_input">
                  {paymentRailsType.map((item) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
        ) : null}
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          PaymentRails ID
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="paymentRailsId"
            render={({ field: { value } }) => {
              return <p style={{ color: 'white' }}>{value}</p>;
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainInfo;
