import React, { useEffect } from 'react';
import { Controller, ControllerRenderProps, FieldValues, useForm } from 'react-hook-form';
import { ProductFilter } from '../../../models/product';
import { checkBoxValue } from '../utils';
import { Action } from 'typesafe-actions';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { useDispatch } from 'react-redux';

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
  Input,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { fetchThunk } from '../../common/redux/thunk';
import { API_PATHS } from '../../../configs/api';

interface Props {
  handleFilter(data: ProductFilter): void;
}

const ProductsFilter = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { control, handleSubmit } = useForm();

  const [suggest, setSuggest] = React.useState<string[]>([]);
  const [moreOption, setMoreOption] = React.useState(false);

  const onSubmit = (data: any) => {
    console.log(data);
    props.handleFilter(data);
    return;
  };

  const fetchSuggestData = React.useCallback(async () => {
    if (suggest.length <= 0) {
      const resp = await dispatch(fetchThunk(API_PATHS.getCategories, 'get'));
      if (resp.success) {
        setSuggest(resp.data.map((item: any) => item.name));
      }
      return;
    }
    return;
  }, [dispatch, suggest.length]);

  useEffect(() => {
    fetchSuggestData();
  });

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
      <form onSubmit={handleSubmit(onSubmit)} style={{ margin: '5px', width: '100%' }}>
        <Grid container sx={{ justifyContent: 'space-around', padding: '8px' }}>
          <Grid
            item
            xs={6}
            style={{
              backgroundColor: '#1b1b38',
              display: 'flex',
              height: '30px',
            }}
          >
            <Controller
              render={({ field }) => (
                <Input
                  {...field}
                  sx={{ backgroundColor: '#1b1b38', margin: 'auto', color: ' white', width: '95%', height: '100%' }}
                  placeholder={'Search Keyword'}
                  color="secondary"
                />
              )}
              name="search"
              control={control}
              defaultValue=""
            />
          </Grid>
          <Grid item xs={2} style={{ backgroundColor: '#1b1b38', display: 'flex', height: '30px' }}>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  defaultValue="0"
                  color="secondary"
                  sx={{
                    backgroundColor: 'transparent',
                    margin: 'auto',
                    color: ' white',
                    width: '95%',
                    height: '100%',
                    paddingBottom: '12px',
                  }}
                >
                  <MenuItem value="0">
                    <em>Any Catagory</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              )}
              name="category"
              control={control}
              defaultValue="0"
            />
          </Grid>
          <Grid item xs={2} style={{ backgroundColor: '#1b1b38', display: 'flex', height: '30px' }}>
            <Controller
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  variant="filled"
                  color="secondary"
                  defaultValue="all"
                  sx={{
                    backgroundColor: 'transparent',
                    margin: 'auto',
                    color: ' white',
                    width: '95%',
                    paddingBottom: '12px',
                    height: '100%',
                  }}
                >
                  <MenuItem value="all">
                    <em>Any Stock Status</em>
                  </MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
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
                      defaultValue=""
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
                      <Select
                        {...field}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        variant="filled"
                        color="secondary"
                        defaultValue="all"
                        sx={{
                          backgroundColor: 'transparent',
                          margin: 'auto',
                          color: ' white',
                          width: '95%',
                          height: '100%',
                          paddingBottom: '12px',
                        }}
                      >
                        <MenuItem value="all">
                          <em>Any Availability Status</em>
                        </MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
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
                  render={({ field }) => (
                    <>
                      <Autocomplete
                        {...field}
                        disablePortal
                        id="combo-box-demo"
                        options={suggest}
                        isOptionEqualToValue={(option, value) => option === value}
                        sx={{
                          backgroundColor: '#1b1b38',
                          margin: 'auto',
                          color: ' white',
                          width: '100%',
                          height: '100%',
                        }}
                        renderInput={(params) => (
                          <div ref={params.InputProps.ref}>
                            <input
                              type="text"
                              {...params.inputProps}
                              style={{
                                backgroundColor: 'rgb(27, 27, 56)',
                                margin: 'auto',
                                color: 'white',
                                width: '95%',
                                border: 'none',
                                outline: 'none',
                              }}
                            />
                          </div>
                        )}
                      />
                    </>
                  )}
                  name="vendor"
                  control={control}
                  defaultValue=""
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
          style={{ backgroundColor: '#323259', width: '40px', height: '20px', display: 'flex' }}
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
