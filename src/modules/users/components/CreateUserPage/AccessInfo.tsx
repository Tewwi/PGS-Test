import { Checkbox, Select, Typography, Input, MenuItem, ListItemText, TextareaAutosize } from '@mui/material';
import React from 'react';
import { Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { Action } from 'typesafe-actions';
import { API_PATHS } from '../../../../configs/api';
import { RoleInfo } from '../../../../models/userList';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { MenuProps, required } from '../../../products/utils';
import { accessLevel, membershipsUser, userStatus } from '../../util';
import { CreateUserPageComProps } from './MainInfo';

const AccessInfo = (props: CreateUserPageComProps) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { control, error, isDetail } = props;
  const [accessLevelValue, setAccessLevelValue] = React.useState<string>();
  const [roles, setRoles] = React.useState<RoleInfo[]>();

  const fetchRolesData = React.useCallback(async () => {
    if (accessLevelValue === '100') {
      const respRole = await dispatch(fetchThunk(API_PATHS.getRole, 'get'));

      if (respRole.success) {
        setRoles(respRole.data.administrator);
        return;
      }
      return;
    }
  }, [dispatch, accessLevelValue]);

  const handleSelectCheckBox = (onChange: (...event: any[]) => void, value?: string[], item?: string) => {
    if (value && item) {
      if (value.indexOf(item) > -1) {
        const newData = value.filter((valueItem) => valueItem != item);
        onChange([...newData]);
      } else {
        onChange([...value, item]);
      }
    }
  };

  const handleRenderValueCheckBox = (arr: string[]) => {
    if (roles) {
      const newData = roles.filter((item) => {
        return arr.indexOf(item.id) >= 0;
      });
      return newData.map((item) => item.name);
    }
    return [];
  };

  React.useEffect(() => {
    if (accessLevelValue === '100') {
      fetchRolesData();
    } else {
      setRoles(undefined);
    }
  }, [accessLevelValue, fetchRolesData]);

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
        Access information
      </Typography>
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Access level<span style={{ color: 'red' }}> *</span>
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          {!isDetail ? (
            <Controller
              control={control}
              name="access_level"
              rules={required('Access level')}
              defaultValue={accessLevel[1].value}
              render={({ field: { onChange, value, ...props } }) => (
                <select
                  onChange={(e) => {
                    console.log(e.target.value);
                    onChange(e.target.value);
                    setAccessLevelValue(e.target.value);
                  }}
                  value={value}
                  {...props}
                  className="field_input"
                >
                  {accessLevel.map((item) => {
                    return (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    );
                  })}
                </select>
              )}
            />
          ) : (
            <Controller
              control={control}
              name="access_level"
              render={({ field: { value } }) => {
                const newData = accessLevel?.findIndex((item) => item.value == value);
                const render = accessLevel[newData]?.label || '';
                return <p style={{ color: 'white' }}>{render}</p>;
              }}
            />
          )}

          <Typography className="error_message">{error?.access_level ? error?.access_level?.message : ''}</Typography>
        </div>
      </div>
      {roles && (
        <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
          <Typography className="label_input_add_user" noWrap>
            Roles
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
            <Controller
              control={control}
              defaultValue={[]}
              name="roles"
              render={({ field: { value, onChange, ...props } }) => (
                <Select
                  {...props}
                  value={value}
                  multiple
                  className="filter_dropdown"
                  displayEmpty
                  input={<Input className="field_input_user" />}
                  renderValue={(select) => {
                    return handleRenderValueCheckBox(value || select).join(', ');
                  }}
                  MenuProps={MenuProps}
                >
                  {roles.map((item) => (
                    <MenuItem key={item.id} onClick={() => handleSelectCheckBox(onChange, value, item.id)}>
                      <Checkbox sx={{ color: 'white' }} checked={value ? value.indexOf(item.id) > -1 : true} />
                      <ListItemText
                        disableTypography
                        primary={<Typography style={{ color: 'white' }}>{item.name}</Typography>}
                      />
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </div>
        </div>
      )}
      {isDetail && (
        <>
          <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
            <Typography className="label_input_add_user" noWrap>
              Account status<span style={{ color: 'red' }}> *</span>
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
              <Controller
                control={control}
                defaultValue={''}
                name="status"
                render={({ field }) => (
                  <select {...field} className="field_input">
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
            </div>
          </div>
          <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
            <Typography className="label_input_add_user" style={{ alignSelf: 'auto' }} noWrap>
              Status comment (reason)
            </Typography>
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%', marginLeft: '15px' }}>
              <Controller
                control={control}
                defaultValue={''}
                name="statusComment"
                render={({ field }) => (
                  <TextareaAutosize minRows={2} {...field} aria-label="empty textarea" className="field_input" />
                )}
              />
            </div>
          </div>
        </>
      )}
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user" noWrap>
          Membership
        </Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            defaultValue={''}
            name="membership_id"
            render={({ field }) => (
              <select {...field} className="field_input">
                {membershipsUser.map((item) => {
                  return (
                    <option key={item.value} value={item.value || ''}>
                      {item.label}
                    </option>
                  );
                })}
              </select>
            )}
          />
        </div>
      </div>
      {isDetail && (
        <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
          <Typography className="label_input_add_user" noWrap>
            Pending membership
          </Typography>
          <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
            <Controller
              control={control}
              name="pending_membership_id"
              render={({ field: { value } }) => {
                return <p style={{ color: 'white' }}>{value || 'none'}</p>;
              }}
            />
          </div>
        </div>
      )}
      <div style={{ display: 'flex', width: '70vw', margin: '20px auto auto 30px' }}>
        <Typography className="label_input_add_user">Require to change password on next log in</Typography>
        <div style={{ display: 'flex', flexDirection: 'column', width: '30%', marginLeft: '15px' }}>
          <Controller
            control={control}
            name="forceChangePassword"
            defaultValue={0}
            render={({ field: { value, onChange, ...props } }) => (
              <Checkbox
                style={{ color: 'white', width: '10%' }}
                onChange={(e, checked) => {
                  if (checked) onChange(1);
                  else onChange(0);
                }}
                value={value}
                checked={value === 1}
                {...props}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default AccessInfo;
