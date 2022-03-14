import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { Country, FilterParam, UserRole } from '../../../../models/userList';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import {
  Button,
  Checkbox,
  Collapse,
  Grid,
  Input,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { MenuProps } from '../../../products/utils';
import { memberships, userStatus } from '../../util';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
import FilterCollab from './FilterCollab';

interface Props {
  handleFilter(data: FilterParam): void;
}

const UserFilter = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const [country, setCountry] = React.useState<Country[]>();
  const [role, setRole] = React.useState<UserRole>();
  const [moreOption, setMoreOption] = React.useState(false);
  const { control, handleSubmit } = useForm<FilterParam>();

  const fetchFilterData = React.useCallback(async () => {
    const respRole = await dispatch(fetchThunk(API_PATHS.getRole, 'get'));
    const respCountry = await dispatch(fetchThunk(API_PATHS.getCountry, 'get'));
    if (respRole.success && respCountry.success) {
      setCountry(respCountry.data);
      setRole(respRole.data);
      return;
    }
    return;
  }, [dispatch]);

  const handleSelectCheckBox = (onChange: (...event: any[]) => void, value: string[], item: string) => {
    if (value.indexOf(item) > -1) {
      const newData = value.filter((valueItem) => valueItem != item);
      onChange([...newData]);
    } else {
      onChange([...value, item]);
    }
  };

  const handleRenderSelectValue = (obj: any, value: string[], fieldName: string, keyId: string) => {
    const result = (Object.keys(obj) as Array<keyof typeof obj>).map((key) => {
      const temp = obj[key].filter((item: any) => {
        return value.indexOf(item[`${keyId}`]) > -1;
      });
      if (temp[0]) {
        return temp[0][`${fieldName}`];
      }
      return;
    });
    return result.filter((item) => item);
  };

  const onSubmit = (data: FilterParam) => {
    props.handleFilter(data);
  };

  React.useEffect(() => {
    fetchFilterData();
  }, [fetchFilterData]);

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
        <Grid container spacing={2} sx={{ justifyContent: 'space-around', padding: '8px' }}>
          <Grid item xs={3}>
            <Controller
              name="search"
              control={control}
              defaultValue=""
              render={({ field }) => <input {...field} className="field_input_user" />}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="memberships"
              control={control}
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <Select
                  {...props}
                  value={value}
                  multiple
                  input={<Input className="field_input_user" />}
                  renderValue={() => handleRenderSelectValue(memberships, value, 'label', 'value').join(', ')}
                  MenuProps={MenuProps}
                >
                  {(Object.keys(memberships) as Array<keyof typeof memberships>).map((key, index) => (
                    <div key={index} style={{ backgroundColor: '#323259' }}>
                      <Typography sx={{ marginLeft: '15px', color: 'white' }}>{key.replace('_', ' ')}</Typography>
                      <div key={index}>
                        {memberships[key].map((item, i) => {
                          return (
                            <MenuItem key={i} onClick={() => handleSelectCheckBox(onChange, value, item.value)}>
                              <Checkbox sx={{ color: 'white' }} checked={value.indexOf(item.value) > -1} />
                              <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'white' }}>{item.label}</Typography>}
                              />
                            </MenuItem>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={3}>
            <Controller
              name="types"
              control={control}
              defaultValue={[]}
              render={({ field: { value, onChange, ...props } }) => (
                <Select
                  {...props}
                  value={value}
                  multiple
                  input={<Input placeholder="All user types" className="field_input_user" />}
                  renderValue={() => handleRenderSelectValue(role, value, 'name', 'id').join(', ')}
                  MenuProps={MenuProps}
                >
                  {role &&
                    (Object.keys(role) as Array<keyof typeof role>).map((key, index) => (
                      <div key={index} style={{ backgroundColor: '#323259' }}>
                        <Typography sx={{ marginLeft: '15px', color: 'white' }}>{key}</Typography>
                        {role[key].map((item) => {
                          return (
                            <MenuItem key={item.id} onClick={() => handleSelectCheckBox(onChange, value, item.id)}>
                              <Checkbox sx={{ color: 'white' }} checked={value.indexOf(item.id) > -1} />
                              <ListItemText
                                disableTypography
                                primary={<Typography style={{ color: 'white' }}>{item.name}</Typography>}
                              />
                            </MenuItem>
                          );
                        })}
                      </div>
                    ))}
                </Select>
              )}
            />
          </Grid>
          <Grid item xs={2}>
            <Controller
              control={control}
              name="status"
              defaultValue={''}
              render={({ field: { value, ...props } }) => (
                <select value={value} {...props} className="field_input_user">
                  {userStatus.map((item) => {
                    return (
                      <option key={item.value} value={item.value || ''}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          </Grid>
          <Grid item xs={1} style={{ margin: 'auto' }}>
            <Button
              variant="contained"
              type="submit"
              sx={{
                backgroundColor: '#b18aff',
                height: '30px',
                margin: 'auto',
                maxWidth: '70px',
                minWidth: '70px',
                textTransform: 'none',
              }}
            >
              <Typography sx={{ fontSize: '15px' }}>Search</Typography>
            </Button>
          </Grid>
        </Grid>
        <Collapse in={moreOption} timeout="auto" unmountOnExit>
          <FilterCollab control={control} country={country} />
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

export default UserFilter;
