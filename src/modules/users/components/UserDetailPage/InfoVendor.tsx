import { Typography } from '@mui/material';
import dayjs from 'dayjs';
import React from 'react';
import { newUser } from '../../../../models/userList';

interface Props {
  data: newUser;
}

const InfoVendor = (props: Props) => {
  const { data } = props;
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#1b1b38',
        display: 'flex',
        flexDirection: 'column',
        paddingBottom: '20px',
        marginBottom: '20px',
      }}
    >
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Orders placed as a buyer
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          {data?.order_as_buyer_total ? (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {`${data?.order_as_buyer}($${(+data?.order_as_buyer_total).toFixed(2)})`}
            </Typography>
          ) : (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {`0($0.00)`}
            </Typography>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Vendor Income
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          {data?.income && (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {`$${(+data.income).toFixed(2)}`}
            </Typography>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Vendor Expense
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          {data?.expense && (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {`$${(+data.expense).toFixed(2)}`}
            </Typography>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Earning balance
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          (
          <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
            {`$${data.earning}`}
          </Typography>
          )
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Products listed as vendor
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
            {`$${data.products_total}`}
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Joined
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          {data.joined && (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {dayjs(new Date(+data.joined * 1000)).format('MMM DD,YYYY, hh:mmA')}
            </Typography>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Joined
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          {data.last_login && (
            <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
              {dayjs(new Date(+data.last_login * 1000)).format('MMM DD,YYYY, hh:mmA')}
            </Typography>
          )}
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Language
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
            {data?.language}
          </Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Referer
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%', marginLeft: '15px' }}>
          <Typography className="label_input_add_user" style={{ width: '100%', textAlign: 'left' }} noWrap>
            {data?.referer}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default InfoVendor;
