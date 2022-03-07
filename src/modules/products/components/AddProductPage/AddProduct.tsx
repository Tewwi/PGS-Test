import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Autocomplete, MenuItem, OutlinedInput, Select, Switch, Typography } from '@mui/material';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Control, Controller } from 'react-hook-form';
import { ProductCreateParam } from '../../../../models/product';
import { fieldData } from '../../pages/AddProductPage';
import DropInput from './DropInput';

export interface AddPageComProps {
  control: Control<ProductCreateParam, any>;
  data?: fieldData;
  error?: any;
}

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

const AddProduct = (props: AddPageComProps) => {
  const { control, data, error } = props;
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
      <div style={{ marginTop: '10px', marginLeft: '15px' }}>
        <ArrowCircleLeftIcon fontSize="large" htmlColor="white" />
      </div>

      <Typography variant="h5" sx={{ color: 'white', marginLeft: '18px', marginTop: '8px' }}>
        Add Product
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Vendor<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="vendor_id"
            rules={required}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                onChange={(event, item) => {
                  onChange(item ? item.id : '');
                }}
                value={value}
                options={data?.vendor || []}
                getOptionLabel={(item) => (item.name ? item.name : '')}
                isOptionEqualToValue={(option, value) => option?.id === value?.id}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref}>
                    <input
                      type="text"
                      {...params.inputProps}
                      className="field_input"
                      placeholder="Type Vendor name to select"
                    />
                  </div>
                )}
              />
            )}
          />
          <Typography style={{ color: 'red' }}>{error?.vendor ? error?.vendor?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Product Title<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            rules={required}
            name="product_title"
            render={({ field: { value, ...props } }) => (
              <input value={value || ''} {...props} type="text" className="field_input" />
            )}
          />
          <Typography style={{ color: 'red' }}>{error?.product_title ? error?.product_title?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Brand<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            rules={required}
            name="brand_id"
            render={({ field: { value, ...props } }) => (
              <select value={value} {...props} className="field_input">
                <option value={'0'}></option>
                {data?.brand?.map((item) => {
                  return (
                    <option key={item.id} value={item.id?.toString()}>
                      {item.name}
                    </option>
                  );
                })}
              </select>
            )}
          />
          <Typography style={{ color: 'red' }}>{error ? error?.brand?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Condition<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            rules={required}
            name="condition_id"
            render={({ field: { value, ...props } }) => (
              <select value={value} {...props} className="field_input">
                <option value=""></option>
                {data?.condition?.map((item, index) => {
                  return (
                    <option key={index} value={item.id?.toString()}>
                      Used
                    </option>
                  );
                })}
              </select>
            )}
          />
          <Typography style={{ color: 'red' }}>{error ? error?.condition?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          SKU
        </Typography>

        <Controller
          control={control}
          name="sku"
          defaultValue={Date.now().toString()}
          render={({ field: { value, ...props } }) => (
            <input value={value} {...props} style={{ width: '70%' }} type="text" className="field_input" />
          )}
        />
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Image<span style={{ color: 'red' }}> *</span>
        </Typography>
        <DropInput nameInput="imagesOrder" control={control} />
        <Typography style={{ color: 'red' }}>{error ? error?.image?.message : ''}</Typography>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Catagory<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            rules={required}
            name="categories"
            defaultValue={[]}
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
                {data?.catagory?.map((item) => (
                  <MenuItem key={item.id} value={+item.id}>
                    {item.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Typography style={{ color: 'red' }}>{error ? error?.catagory?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Description<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            name="description"
            rules={required}
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <div style={{ width: '100%' }}>
                  <Editor
                    editorState={value}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={onChange}
                    editorStyle={{
                      backgroundColor: 'white',
                      minHeight: '100px',
                    }}
                  />
                </div>
              );
            }}
          />
          <Typography style={{ color: 'red' }}>{error ? error?.description?.message : ''}</Typography>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography
          sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          noWrap
        >
          Available for sale
        </Typography>
        <Controller
          name="enabled"
          control={control}
          defaultValue={0}
          render={({ field: { onChange, value } }) => {
            return <Switch value={value} checked={value === 1} onChange={onChange} />;
          }}
        />
      </div>
    </div>
  );
};

export default AddProduct;