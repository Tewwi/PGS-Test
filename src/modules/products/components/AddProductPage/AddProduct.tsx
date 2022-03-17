import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Autocomplete, Input, MenuItem, Select, Switch, Typography } from '@mui/material';
import React from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Control, Controller } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { ProductCreateParam } from '../../../../models/product';
import { fieldData } from '../../pages/AddProductPage';
import { MenuProps, required } from '../../utils';
import DropInput from './DropInput';

export interface AddPageComProps {
  control: Control<ProductCreateParam, any>;
  data?: fieldData;
  error?: any;
  defaultValue?: ProductCreateParam;
}

interface Props {
  rest: AddPageComProps;
  handleDeleImg?: (id: number) => void;
}

const AddProduct = (props: Props) => {
  const { control, data, error, defaultValue } = props.rest;

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
        <Link to={'/'}>
          <ArrowCircleLeftIcon fontSize="large" htmlColor="white" />
        </Link>
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
            rules={required('Vendor')}
            render={({ field: { onChange, value, ...props } }) => (
              <>
                <Autocomplete
                  {...props}
                  value={value || null}
                  isOptionEqualToValue={(option, value) => +option?.id == +value.id}
                  options={data?.vendor || []}
                  getOptionLabel={(item) => (item ? item.name : '')}
                  onChange={(event, item) => {
                    onChange(item ? item : '');
                  }}
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
              </>
            )}
          />
          <Typography className="error_message">{error?.vendor_id ? error?.vendor_id?.message : ''}</Typography>
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
            rules={required('Product Title')}
            name="name"
            defaultValue={''}
            render={({ field }) => <input {...field} type="text" className="field_input" />}
          />
          <Typography className="error_message">{error?.name ? error?.name?.message : ''}</Typography>
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
            rules={required('Brand')}
            name="brand_id"
            defaultValue={''}
            render={({ field: { value, ...props } }) => (
              <select value={value} {...props} className="field_input">
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
          <Typography className="error_message">{error.brand_id ? error?.brand_id?.message : ''}</Typography>
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
            rules={required('Condition')}
            name="condition_id"
            defaultValue={''}
            render={({ field: { value, ...props } }) => (
              <select value={value} {...props} className="field_input">
                <option value={''}></option>
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
          <Typography className="error_message">{error.condition_id ? error?.condition_id?.message : ''}</Typography>
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
        <DropInput
          nameInput="imgUpload"
          control={control}
          dataDefault={defaultValue}
          handleDeleImg={props.handleDeleImg}
        />
        <Typography className="error_message">{error?.imgUpload ? error?.imgUpload?.message : ''}</Typography>
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
            rules={required('Catagory')}
            name="categories"
            defaultValue={[]}
            render={({ field: { value, ...props } }) => (
              <Select
                {...props}
                multiple
                value={value ?? ''}
                input={
                  <Input
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
          <Typography className="error_message">{error?.categories ? error?.categories?.message : ''}</Typography>
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
            rules={required('Description')}
            control={control}
            defaultValue={''}
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
          <Typography className="error_message">{error?.description ? error?.description?.message : ''}</Typography>
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
            return (
              <Switch
                value={value == 1}
                checked={value == 1}
                onChange={(e, checked) => {
                  onChange(checked ? 1 : 0);
                }}
              />
            );
          }}
        />
      </div>
    </div>
  );
};

export default AddProduct;
