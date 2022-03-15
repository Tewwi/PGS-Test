import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import {
  Autocomplete,
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { ProductFilter, Vendor } from '../../../../models/product';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { availabilityStatus, checkBoxValue, stockStatus } from '../../utils';

interface Props {
  handleFilter(data: ProductFilter): void;
}

const ProductsFilter = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { control, handleSubmit } = useForm();

  const [category, setCategory] = React.useState<string[]>([]);
  const [moreOption, setMoreOption] = React.useState(false);
  const [vendor, setVendor] = React.useState<Vendor[]>();

  const onSubmit = (data: any) => {
    console.log(data);
    props.handleFilter(data);
    return;
  };

  const fetchCategoryData = React.useCallback(async () => {
    if (category.length <= 0) {
      const resp = await dispatch(fetchThunk(API_PATHS.getCategories, 'get'));
      if (resp.success) {
        setCategory(resp.data);
      }
      return;
    }
    return;
  }, [dispatch, category.length]);

  const fetchVendorData = React.useCallback(async () => {
    if (!vendor) {
      const resp = await dispatch(fetchThunk(API_PATHS.getVendor, 'get'));
      if (resp.success) {
        setVendor(resp.data);
      }
      return;
    }
    return;
  }, [dispatch, vendor]);

  useEffect(() => {
    fetchCategoryData();
  }, [fetchCategoryData]);

  useEffect(() => {
    fetchVendorData();
  }, [fetchVendorData]);

  const onChangeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    checked: boolean,
    field: ControllerRenderProps<FieldValues>,
  ) => {
    if (!field.value) {
      field.value = [];
    }
    if (checked) {
      field.onChange([...field.value, e.target.value]);
    } else {
      field.onChange(field.value.filter((value: any) => value !== e.target.value));
    }
  };

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#323259',
      }}
    >
      <form autoComplete="off" onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
        <Grid container sx={{ justifyContent: 'space-around', padding: '8px' }}>
          <Grid item xs={6}>
            <Controller
              render={({ field }) => <input {...field} placeholder={'Search Keyword'} className="field_input_user" />}
              name="search"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              name="category"
              control={control}
              defaultValue="0"
              render={({ field }) => (
                <select {...field} className="field_input_user">
                  <option value="0">Any Catagory</option>
                  {category.map((item: any, index) => {
                    return (
                      <option key={index} value={item.id}>
                        {item.name}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              render={({ field }) => (
                <select {...field} className="field_input_user">
                  {stockStatus.map((item, i) => (
                    <option key={i} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              )}
              name="stock_status"
              control={control}
              defaultValue="all"
            />
          </Grid>
          <Grid item xs={1} style={{ backgroundColor: 'transparent', display: 'flex' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#b18aff',
                height: '30px',
                margin: 'auto',
                textTransform: 'none',
              }}
            >
              <Typography sx={{ fontSize: '15px' }}>Search</Typography>
            </Button>
          </Grid>
        </Grid>
        <Collapse in={moreOption} timeout="auto" unmountOnExit>
          <Grid container sx={{ justifyContent: 'space-around', padding: '10px', borderTop: '1px solid black' }}>
            <Grid item xs={3}>
              <FormControl component="fieldset" variant="standard" sx={{ display: 'flex', color: 'white' }}>
                <div style={{ display: 'flex', color: 'white' }}>
                  <FormLabel component="legend" sx={{ width: '30%' }}>
                    <Typography sx={{ fontSize: '15px', color: 'white' }}>Search in:</Typography>
                  </FormLabel>
                  <FormGroup>
                    <Controller
                      render={({ field }) => (
                        <>
                          {checkBoxValue.map((item) => (
                            <FormControlLabel
                              key={item}
                              label={item}
                              control={
                                <Checkbox
                                  value={item}
                                  sx={{ color: 'white' }}
                                  checked={field.value?.includes(item) || false}
                                  onChange={(e, checked) => onChangeCheckBox(e, checked, { ...field })}
                                />
                              }
                            />
                          ))}
                        </>
                      )}
                      name="search_type"
                      control={control}
                      defaultValue={['']}
                    />
                  </FormGroup>
                </div>
              </FormControl>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', height: '30px' }}>
              <Typography sx={{ fontSize: '15px', color: 'white', margin: 'auto', marginRight: '15px' }}>
                Availability
              </Typography>
              <div style={{ backgroundColor: '#1b1b38', width: '100%' }}>
                <Controller
                  render={({ field }) => (
                    <>
                      <select {...field} className="field_input_user">
                        {availabilityStatus.map((item, i) => (
                          <option key={i} value={item.value}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                  name="availability"
                  control={control}
                  defaultValue="all"
                />
              </div>
            </Grid>
            <Grid item xs={4} style={{ display: 'flex', height: '30px' }}>
              <Typography sx={{ fontSize: '15px', color: 'white', margin: 'auto', marginRight: '15px' }}>
                Vendor
              </Typography>
              <div style={{ backgroundColor: '#1b1b38', width: '100%' }}>
                <Controller
                  control={control}
                  name="vendor"
                  render={({ field: { onChange, value } }) => (
                    <Autocomplete
                      onChange={(event, item) => {
                        onChange(item ? item.login : '');
                      }}
                      value={value}
                      options={vendor || []}
                      getOptionLabel={(item) => (item.name ? item.name : '')}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      renderInput={(params) => (
                        <div ref={params.InputProps.ref}>
                          <input type="text" {...params.inputProps} className="field_input_user" />
                        </div>
                      )}
                    />
                  )}
                />
              </div>
            </Grid>
          </Grid>
        </Collapse>
      </form>
      <div
        style={{
          width: '100%',
          height: '0px',
          backgroundColor: 'transparent',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          onClick={() => setMoreOption(!moreOption)}
          style={{
            backgroundColor: '#323259',
            width: '40px',
            height: '20px',
            display: 'flex',
            borderRadius: '0px 0px 5px 5px',
          }}
        >
          {moreOption ? (
            <KeyboardDoubleArrowUpIcon fontSize="small" sx={{ margin: 'auto' }} />
          ) : (
            <KeyboardDoubleArrowDownIcon fontSize="small" sx={{ margin: 'auto' }} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsFilter;
