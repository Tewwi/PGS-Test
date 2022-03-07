import { Checkbox, FormControlLabel, FormGroup, MenuItem, OutlinedInput, Select, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { memberships, sale_unit } from '../../utils';
import { AddPageComProps } from './AddProduct';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_BOTTOM = -30;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_BOTTOM,
      width: 250,
    },
  },
};

const Price = (props: AddPageComProps) => {
  const { control, error, defaultValue } = props;
  const required = { required: { value: true, message: 'This field is requierd' } };
  const [isSale, setIsSale] = React.useState(false);

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
        Prices {'&'} Inventory
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Member Ship
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="memberships"
            defaultValue={defaultValue?.memberships || []}
            render={({ field: { value, ...props } }) => (
              <Select
                {...props}
                multiple
                value={value ?? ''}
                defaultValue={[]}
                input={
                  <OutlinedInput
                    className="field_input"
                    style={{
                      maxHeight: '42px',
                      outline: 'none',
                    }}
                  />
                }
                MenuProps={MenuProps}
              >
                {memberships?.map((item, index) => (
                  <MenuItem key={index} value={item.value || 0}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Tax class
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: 'white' }}>
            <Typography>Default</Typography>
            <Controller
              control={control}
              name="tax_exempt"
              defaultValue={defaultValue?.tax_exempt || 0}
              render={({ field: { value, ...props } }) => (
                <FormGroup>
                  <FormControlLabel
                    style={{ color: 'white' }}
                    control={<Checkbox style={{ color: 'white' }} value={value} checked={value === 1} {...props} />}
                    label="Tax Exempt"
                  />
                </FormGroup>
              )}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Price<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', backgroundColor: '#40405f', borderRadius: '5px' }}>
              <div style={{ display: 'flex', backgroundColor: '#40405f', width: '25%', borderRadius: '5px' }}>
                <p style={{ margin: 'auto' }}>{'$'}</p>
              </div>
              <Controller
                control={control}
                name="price"
                rules={required}
                defaultValue={defaultValue?.price || ''}
                render={({ field: { value, ...props } }) => (
                  <input value={value} {...props} type="number" className="field_input" />
                )}
              />
            </div>
            <div style={{ display: 'flex', marginLeft: '10px' }}>
              <FormGroup>
                <FormControlLabel
                  style={{ color: 'white' }}
                  control={
                    <Checkbox
                      style={{ color: 'white' }}
                      value={isSale}
                      onChange={() => {
                        setIsSale(!isSale);
                      }}
                    />
                  }
                  label="Sale"
                />
              </FormGroup>
              {isSale && (
                <div style={{ display: 'flex', backgroundColor: '#40405f', borderRadius: '5px' }}>
                  <Controller
                    control={control}
                    name="sale_price_type"
                    defaultValue={defaultValue?.sale_price_type || ''}
                    render={({ field: { value, ...props } }) => (
                      <select
                        value={value || ''}
                        {...props}
                        style={{ width: '30%', backgroundColor: '#40405f' }}
                        className="field_input"
                      >
                        {sale_unit.map((item) => {
                          return (
                            <option key={item} value={item ?? ''}>
                              {item}
                            </option>
                          );
                        })}
                      </select>
                    )}
                  />
                  <Controller
                    control={control}
                    name="sale_price"
                    defaultValue={defaultValue?.sale_price || ''}
                    render={({ field: { value, ...props } }) => (
                      <input value={value} {...props} type="number" className="field_input" />
                    )}
                  />
                </div>
              )}
            </div>
          </div>
          <Typography style={{ color: 'red' }}>{error ? error?.price?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Arrival date
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <div style={{ display: 'flex', backgroundColor: '#40405f', borderRadius: '5px' }}>
            <div style={{ display: 'flex', backgroundColor: '#40405f', width: '10%', borderRadius: '5px' }}>
              <CalendarTodayIcon fontSize="small" style={{ color: 'grey', margin: 'auto' }} />
            </div>
            <Controller
              control={control}
              name="arrival_date"
              defaultValue={defaultValue?.arrival_date || ''}
              render={({ field: { value, ...props } }) => (
                <input value={value} {...props} type="date" className="field_input" />
              )}
            />
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Quantity in stock<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="quantity"
            rules={required}
            defaultValue={defaultValue?.quantity || ''}
            render={({ field: { value, ...props } }) => (
              <input value={value} {...props} type="number" className="field_input" />
            )}
          />
          <Typography style={{ color: 'red' }}>{error ? error?.stock?.message : ''}</Typography>
        </div>
      </div>
    </div>
  );
};

export default Price;
