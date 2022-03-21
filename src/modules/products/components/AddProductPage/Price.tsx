import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Input,
  ListItemText,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { memberships, MenuProps, required, sale_unit } from '../../utils';
import { AddPageComProps } from './AddProduct';

const Price = (props: AddPageComProps) => {
  const { control, error } = props;
  const [isSale, setIsSale] = React.useState(false);

  const handleSelectCheckBox = (onChange: (...event: any[]) => void, value?: number[] | null, item?: number | null) => {
    if (value && item) {
      if (value.indexOf(item) > -1) {
        const newData = value.filter((valueItem) => valueItem != item);
        onChange([...newData]);
      } else {
        onChange([...value, item]);
      }
    }
  };

  const handleRenderValueCheckBox = (arr: any) => {
    if (memberships && arr !== null) {
      const newData = memberships.filter((item) => {
        return arr.indexOf(item.value ? +item.value : 1) >= 0;
      });
      return newData.map((item) => item.label);
    }
    return [];
  };

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
            defaultValue={[]}
            render={({ field: { value, onChange, ...props } }) => (
              <Select
                {...props}
                multiple
                value={value ?? ''}
                defaultValue={[]}
                input={
                  <Input
                    className="field_input"
                    style={{
                      maxHeight: '42px',
                      outline: 'none',
                    }}
                  />
                }
                renderValue={(select) => {
                  return handleRenderValueCheckBox(value || select).join(', ');
                }}
                MenuProps={MenuProps}
              >
                {memberships?.map((item) => (
                  <MenuItem
                    key={item.value}
                    onClick={() => handleSelectCheckBox(onChange, value, item.value ? +item.value : 1)}
                  >
                    <Checkbox
                      sx={{ color: 'white' }}
                      checked={value ? value.indexOf(item.value ? +item.value : 1) > -1 : true}
                    />
                    <ListItemText
                      disableTypography
                      primary={<Typography style={{ color: 'white' }}>{item.label}</Typography>}
                    />
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
              defaultValue={0}
              render={({ field: { value, onChange, ...props } }) => (
                <FormGroup>
                  <FormControlLabel
                    style={{ color: 'white' }}
                    control={
                      <Checkbox
                        style={{ color: 'white' }}
                        value={value}
                        onChange={(e, checked) => {
                          if (checked) onChange(1);
                          else onChange(0);
                        }}
                        checked={value === 1}
                        {...props}
                      />
                    }
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
                rules={required('Price')}
                defaultValue={''}
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
                    defaultValue={''}
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
                    defaultValue={''}
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
              defaultValue={''}
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
            rules={required('Quantity in stock')}
            defaultValue={''}
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
