import { Typography } from '@mui/material';
import React from 'react';
import { Controller, FieldArrayWithId } from 'react-hook-form';
import { IShipping, ProductCreateParam } from '../../../../models/product';
import { AddPageComProps } from './AddProduct';

interface Props {
  fields: FieldArrayWithId<ProductCreateParam, 'shipping_to_zones', 'id'>[];
  rest: AddPageComProps;
  handleAddShipping(obj: IShipping): void;
  handleRemoveShipping(index: number): void;
}

const Shipping = (props: Props) => {
  const { control, data, error } = props.rest;
  const [shippingLocationIndex, setShippingLocationIndex] = React.useState<number>(0);
  console.log(props.fields);

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
        Shipping
      </Typography>
      {props.fields.map((item, index) => {
        return (
          <div key={item.id} style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
            <Typography
              sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
              noWrap
            >
              {item.zone_name}
              {index === 0 && <span style={{ color: 'red' }}> *</span>}
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <div style={{ display: 'flex', backgroundColor: '#40405f', borderRadius: '5px' }}>
                <div style={{ display: 'flex', backgroundColor: '#40405f', width: '15%', borderRadius: '5px' }}>
                  <p style={{ margin: 'auto' }}>{'$'}</p>
                </div>

                <Controller
                  control={control}
                  name={`shipping_to_zones[${index}].price` as any}
                  rules={{ required: { value: index === 0, message: 'This field is requierd' } }}
                  defaultValue={item.price}
                  render={({ field: { value, ...props } }) => (
                    <input value={Number(value).toFixed(2) || ''} {...props} type="number" className="field_input" />
                  )}
                />
                <Controller
                  control={control}
                  name={`shipping_to_zones[${index}].id` as any}
                  defaultValue={item.id}
                  render={({ field }) => <input {...field} type="string" style={{ display: 'none' }} />}
                />
              </div>
              {index === 0 && (
                <Typography style={{ color: 'red' }}>{error ? error?.shipping_to_zones?.message : ''}</Typography>
              )}
            </div>
            {index !== 0 && (
              <p
                style={{ width: '30%', margin: 'auto', color: 'white', cursor: 'pointer' }}
                onClick={() => {
                  props.handleRemoveShipping(index);
                }}
              >
                Remove
              </p>
            )}
          </div>
        );
      })}
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        ></Typography>
        <div style={{ display: 'flex', width: '50%' }}>
          <select
            value={shippingLocationIndex}
            onChange={(e) => {
              setShippingLocationIndex(+e.target.value);
            }}
            className="field_input"
          >
            {data?.shipping?.map((item, index) => {
              return (
                <option key={item.id} value={index}>
                  {item.zone_name}
                </option>
              );
            })}
          </select>
          <div
            style={{ width: '40%', margin: 'auto', cursor: 'pointer' }}
            onClick={() => {
              if (data?.shipping) {
                props.handleAddShipping(data?.shipping[shippingLocationIndex]);
              }
            }}
          >
            <Typography sx={{ fontSize: '15px', color: 'white', marginLeft: '15px', alignSelf: 'center' }} noWrap>
              Add Shipping Location
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipping;
