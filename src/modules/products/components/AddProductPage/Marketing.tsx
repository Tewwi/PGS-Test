import { Switch, TextareaAutosize, Typography } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { metaDesc, ogTags } from '../../utils';
import { AddPageComProps } from './AddProduct';

const Marketing = (props: AddPageComProps) => {
  const { control } = props;
  const [isOgTagCustom, setIsOgTagCustom] = React.useState(false);
  const [isMetaDescCustom, setIsMetaDescCustom] = React.useState(false);
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
        Marketing
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Open Graph meta tags
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="og_tags_type"
            defaultValue={'0'}
            render={({ field: { value, ...props } }) => (
              <select
                value={value}
                {...props}
                onChange={(e) => {
                  props.onChange(e);
                  if (e.target.value === '1') {
                    setIsOgTagCustom(true);
                  } else {
                    setIsOgTagCustom(false);
                  }
                }}
                className="field_input"
              >
                {ogTags?.map((item, index) => {
                  return (
                    <option key={index} value={item.type}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>
      </div>
      {isOgTagCustom && (
        <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
          <Typography
            sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          ></Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
            <Controller
              control={control}
              name="og_tags"
              defaultValue={''}
              render={({ field: { value, ...props } }) => (
                <TextareaAutosize value={value} {...props} aria-label="empty textarea" className="field_input" />
              )}
            />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Meta description
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="meta_desc_type"
            defaultValue={'A'}
            render={({ field: { value, ...props } }) => (
              <select
                value={value}
                {...props}
                onChange={(e) => {
                  props.onChange(e);
                  if (e.target.value === 'C') {
                    setIsMetaDescCustom(true);
                  } else {
                    setIsMetaDescCustom(false);
                  }
                }}
                className="field_input"
              >
                {metaDesc?.map((item) => {
                  return (
                    <option key={item.label} value={item.type}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>
      </div>
      {isMetaDescCustom && (
        <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
          <Typography
            sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}
          ></Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
            <Controller
              control={control}
              name="meta_description"
              defaultValue={''}
              render={({ field: { value, ...props } }) => (
                <TextareaAutosize value={value} {...props} aria-label="empty textarea" className="field_input" />
              )}
            />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Meta keywords
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="meta_keywords"
            defaultValue={''}
            render={({ field }) => <input {...field} className="field_input" />}
          />
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Product page title
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '70%' }}>
          <Controller
            control={control}
            name="product_page_title"
            defaultValue={''}
            render={({ field }) => <input {...field} className="field_input" />}
          />
          <p style={{ fontSize: '11px', color: 'grey' }}>Leave blank to use product name as Page Title.</p>
        </div>
      </div>
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Add to Facebook product feed
        </Typography>
        <Controller
          name="facebook_marketing_enabled"
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
      <div style={{ display: 'flex', width: '70vw', margin: 'auto', marginTop: '20px' }}>
        <Typography sx={{ fontSize: '16px', color: 'white', marginRight: '15px', alignSelf: 'center', width: '15%' }}>
          Add to Google product feed
        </Typography>
        <Controller
          name="google_feed_enabled"
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

export default Marketing;
