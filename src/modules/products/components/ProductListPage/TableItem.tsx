import DeleteIcon from '@mui/icons-material/Delete';
import PowerSettingsNewOutlinedIcon from '@mui/icons-material/PowerSettingsNewOutlined';
import { Box, Button, Checkbox, Divider, Modal, TableCell, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../../../configs/routes';
import { Product } from '../../../../models/product';

const useStyles = makeStyles(() => ({
  divider: {
    background: 'white',
    minHeight: '20px',
    margin: 'auto',
  },
}));

interface Props {
  data: Product;
  index: number;
  onCheckBox(id: string): void;
  handleTrashIcon(id: string): void;
  handleChangeValueItem(data: { price: string; amount: string; id: string }, index: number): void;
  handleClickPowerBtn(id: string, enabled: boolean): void;
}
const TableItem = (props: Props) => {
  const { data, onCheckBox, handleTrashIcon, index, handleChangeValueItem, handleClickPowerBtn } = props;
  const [isSelect, setIsSelect] = React.useState(false);
  const [isInputOpen, setIsInputOpen] = React.useState(false);
  const [valueInput, setValueInput] = React.useState({
    price: data.price,
    amount: data.amount,
    id: data.id,
  });
  const [openModal, setOpenModal] = React.useState(false);
  const colorPower = data.enabled == '1' ? '#aaf285' : 'white';
  const classes = useStyles();

  const handleOpenInput = () => {
    if (data.isDele) return;
    setIsInputOpen(true);
  };

  const handleCloseInput = () => {
    handleChangeValueItem(valueInput, index);
    setIsInputOpen(false);
  };

  const handlePowerBtn = () => {
    handleClickPowerBtn(data.id, !(data.enabled == '1'));
    setOpenModal(false);
  };

  return (
    <>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal_content" style={{ backgroundColor: '#323259' }}>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'flex-start', marginBottom: '20px' }}>
            <Typography variant="h6" style={{ margin: 'auto' }}>
              Confirm Update
            </Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'flex-start', marginBottom: '25px' }}>
            <Typography style={{ margin: 'auto' }}>Do you want to update this product?</Typography>
          </div>
          <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              sx={{ color: '#ad84ff' }}
              onClick={() => {
                handlePowerBtn();
              }}
            >
              Yes
            </Button>
            <Button variant="contained" sx={{ color: '#ff5880' }} onClick={() => setOpenModal(false)}>
              No
            </Button>
          </div>
        </Box>
      </Modal>
      <TableRow selected={isSelect} className={`table_row ${isSelect ? 'row_select' : ''}`}>
        <TableCell padding="checkbox">
          <div style={{ display: 'flex' }}>
            <Checkbox
              sx={{ color: 'white' }}
              size="small"
              checked={data.checked}
              onChange={() => onCheckBox(data.id)}
            />
            <Divider orientation="vertical" variant="middle" flexItem classes={{ root: classes.divider }} />
            <div style={{ margin: 'auto', borderRight: '1px dashed white' }} onClick={() => setOpenModal(true)}>
              <PowerSettingsNewOutlinedIcon htmlColor={colorPower} sx={{ margin: '5px' }} />
            </div>
          </div>
        </TableCell>
        <TableCell align="left" padding="normal" sx={{ color: 'white' }}>
          {data.sku}
        </TableCell>
        <TableCell align="left" style={{ minWidth: 190, maxWidth: 190 }}>
          <Typography className="link-text" noWrap>
            <Link to={`${ROUTES.productDetail}/${data.id}`}>{data.name}</Link>
          </Typography>
        </TableCell>
        <TableCell align="left" sx={{ color: 'white' }}>
          <Typography sx={{ fontSize: '13px' }} noWrap>
            {data.category}
          </Typography>
        </TableCell>
        {isInputOpen ? (
          <>
            <TableCell align="center" sx={{ color: 'white' }} onBlur={() => handleCloseInput()}>
              <div style={{ display: 'flex', backgroundColor: 'white', width: '70px', borderRadius: '3px' }}>
                <div
                  style={{
                    display: 'flex',
                    width: '25%',
                    backgroundColor: '#e3d5ff',
                    borderRadius: '3px',
                  }}
                >
                  <p style={{ margin: 'auto', color: 'black' }}>{'$'}</p>
                </div>
                <input
                  style={{
                    width: '55%',
                    height: '100%',
                    outline: 'none',
                    border: 'none',
                  }}
                  value={valueInput.price}
                  onChange={(e) =>
                    setValueInput((prev) => {
                      return { ...prev, price: e.target.value };
                    })
                  }
                  type={'number'}
                />
              </div>
            </TableCell>
            <TableCell
              align="center"
              style={{ minWidth: 50, maxWidth: 50, color: 'white', width: '70px' }}
              onBlur={() => handleCloseInput()}
            >
              <input
                type={'number'}
                value={valueInput.amount}
                onChange={(e) =>
                  setValueInput((prev) => {
                    return { ...prev, amount: e.target.value };
                  })
                }
                style={{ width: '100%', outline: 'none', border: 'none', borderRadius: '3px' }}
              />
            </TableCell>
          </>
        ) : (
          <>
            <TableCell align="center" sx={{ color: 'white' }}>
              <Typography className="row_input" onClick={() => handleOpenInput()} sx={{ fontSize: '13px' }} noWrap>
                ${Number(data.price).toFixed(2)}
              </Typography>
            </TableCell>
            <TableCell align="center" style={{ minWidth: 50, maxWidth: 50, color: 'white' }}>
              <Typography className="row_input" onClick={() => handleOpenInput()} sx={{ fontSize: '13px' }} noWrap>
                {data.amount}
              </Typography>
            </TableCell>
          </>
        )}

        <TableCell align="left" style={{ minWidth: 110, maxWidth: 110, color: 'white' }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Typography className="link-text" noWrap>
              <Link to={`${ROUTES.userDetail}/${data.vendorID}`}>{data.vendor}</Link>
            </Typography>
          </div>
        </TableCell>
        <TableCell align="left" style={{ minWidth: 20, maxWidth: 20, color: 'white' }}>
          <Typography sx={{ fontSize: '13px' }} noWrap>
            {dayjs(new Date(+data.arrivalDate * 1000)).format('MMM DD,YYYY')}
          </Typography>
        </TableCell>
        <TableCell align="left" style={{ minWidth: 70, maxWidth: 70, color: 'white' }}>
          <div style={{ display: 'flex' }}>
            <div
              style={{ margin: 'auto', borderRight: '1px dashed white', marginRight: '8px', minHeight: '30px' }}
            ></div>
            <div
              onClick={() => {
                handleTrashIcon(data.id);
                setIsSelect(!isSelect);
              }}
              style={{ padding: '2px', backgroundColor: '#e993f9', borderRadius: '5px' }}
            >
              <DeleteIcon />
            </div>
          </div>
        </TableCell>
      </TableRow>
    </>
  );
};

export default memo(TableItem);
