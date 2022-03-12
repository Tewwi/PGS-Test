import { FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';
import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { Country, FilterParam, State } from '../../../../models/userList';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { data_type } from '../../util';
import 'react-datepicker/dist/react-datepicker.css';

interface Props {
  control: Control<FilterParam, any>;
  country?: Country[];
}

const FilterCollab = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { control, country } = props;
  const [state, setState] = React.useState<State[]>([]);
  const [selectCountry, setSelectCountry] = React.useState<string>();

  const fetchStateData = React.useCallback(async () => {
    if (selectCountry && selectCountry !== '') {
      const resp = await dispatch(fetchThunk(API_PATHS.getState, 'post', { code: selectCountry }));
      if (resp.success) {
        setState(resp.data);
        return;
      }
      console.log('error');
      return;
    }
    return;
  }, [dispatch, selectCountry]);

  React.useEffect(() => {
    fetchStateData();
  }, [fetchStateData]);

  return (
    <div style={{ display: 'flex', width: '100%', borderTop: '1px solid black' }}>
      <div style={{ width: '40%', display: 'flex', flexDirection: 'column', marginLeft: '15px', marginBottom: '10px' }}>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Typography sx={{ fontSize: '13px', color: 'white', alignSelf: 'center', width: '15%' }}>Country</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Controller
              control={control}
              name="country"
              render={({ field: { onChange, value, ...props } }) => (
                <select
                  value={value}
                  {...props}
                  onChange={(e) => {
                    onChange(e.target.value);
                    if (e.target.value !== '') {
                      setSelectCountry(e.target.value);
                    } else {
                      setState([]);
                    }
                  }}
                  className="field_input_user"
                >
                  <option value={''}>Select country</option>
                  {country?.map((item) => {
                    return (
                      <option key={item.id} value={item.code}>
                        {item.country}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Typography sx={{ fontSize: '13px', color: 'white', alignSelf: 'center', width: '15%' }}>State</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Controller
              control={control}
              name="state"
              render={({ field: { value, ...props } }) => {
                if (state.length > 0) {
                  return (
                    <select value={value} {...props} className="field_input_user">
                      <option value={''}></option>
                      {state?.map((item) => {
                        return (
                          <option key={item.state_id} value={item.state}>
                            {item.state}
                          </option>
                        );
                      })}
                    </select>
                  );
                } else {
                  return <input value={value} {...props} type={'text'} className="field_input_user" />;
                }
              }}
            />
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Typography sx={{ fontSize: '13px', color: 'white', alignSelf: 'center', width: '15%' }}>Address</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Controller
              control={control}
              name="address"
              defaultValue=""
              render={({ field: { value, ...props } }) => (
                <input type={'text'} value={value} {...props} className="field_input_user" />
              )}
            />
          </div>
        </div>
        <div style={{ display: 'flex', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Typography sx={{ fontSize: '13px', color: 'white', alignSelf: 'center', width: '15%' }}>Phone</Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Controller
              control={control}
              name="phone"
              defaultValue=""
              render={({ field: { value, ...props } }) => (
                <input type={'text'} value={value} {...props} className="field_input_user" />
              )}
            />
          </div>
        </div>
      </div>
      <div
        style={{
          width: '50%',
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '10px',
          marginTop: '20px',
        }}
      >
        <Controller
          control={control}
          name="date_type"
          defaultValue="R"
          render={({ field: { value, ...props } }) => (
            <FormControl sx={{ display: 'flex', flexDirection: 'row' }}>
              <Typography sx={{ color: 'white', margin: 'auto', maxWidth: '20%', fontSize: '13px' }}>
                User activity
              </Typography>
              <RadioGroup row value={value} {...props} sx={{ color: 'white', width: '70%' }}>
                {data_type.map((item) => {
                  return (
                    <FormControlLabel
                      key={item.value}
                      sx={{ color: 'white' }}
                      value={item.value}
                      control={<Radio sx={{ color: 'white' }} />}
                      label={item.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          )}
        />
        <div style={{ display: 'flex', width: '100%', margin: 'auto', marginTop: '20px' }}>
          <Typography sx={{ fontSize: '13px', color: 'white', alignSelf: 'center', width: '30%' }}></Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '60%' }}>
            <Controller
              control={control}
              name="date_range"
              defaultValue={[]}
              render={({ field: { value, ...props } }) => (
                <DatePicker
                  selected={value[0]}
                  startDate={value[0]}
                  endDate={value[1]}
                  {...props}
                  // dateFormat="DD MMM,YYYY"
                  selectsRange
                  placeholderText="Enter Date Range"
                  customInput={<input className="field_input_user" />}
                />
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCollab;
