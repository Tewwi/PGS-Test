import React from 'react';
import { Button, Typography, Modal, Box } from '@mui/material';
import { tableHeaderLabel } from '../../utils';
import { Product } from '../../../../models/product';
import { CSVLink } from 'react-csv';
import { Data } from 'react-csv/components/CommonPropTypes';
import dayjs from 'dayjs';

interface Props {
  btnInfo: {
    disable: boolean;
    isDele: boolean;
    text: string;
  };
  handleSaveBtn(): void;
  handleRemovebtn(): void;
  data?: Product[];
}

const headerCSV = tableHeaderLabel.map((item) => {
  return { label: item.name, key: item.name.toLowerCase() };
});

const ProductPageFooter = (props: Props) => {
  const { btnInfo, handleSaveBtn, handleRemovebtn, data } = props;
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [dataExport, setDataExport] = React.useState<any>([]);

  React.useEffect(() => {
    if (data) {
      setDataExport(
        data?.map((item) => {
          return {
            ...item,
            'in stock': item.amount,
            'arrival date': dayjs(+item.arrivalDate * 1000).format('DD/MM/YYYY'),
          };
        }),
      );
    }
  }, [data]);

  return (
    <div
      style={{
        display: 'flex',
        position: 'fixed',
        width: '60vw',
        height: '50px',
        backgroundColor: '#323259',
        bottom: 0,
        left: 0,
        right: 0,
        margin: '0 auto',
        boxShadow: '1px 1px 10px 10px #b18aff',
        borderRadius: '3px',
        zIndex: '10000',
      }}
    >
      <Button
        variant="contained"
        disabled={btnInfo.disable}
        style={{ maxWidth: '120px', maxHeight: '35px', minWidth: '120px', minHeight: '35px' }}
        sx={{
          padding: '10px',
          backgroundColor: '#efa945',
          '&: hover': {
            backgroundColor: '#efa945',
            color: 'black',
          },
          alignSelf: 'center',
          marginLeft: '20px',
          textTransform: 'none',
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <Typography sx={{ fontSize: '13px' }} noWrap>
          {btnInfo.text}
        </Typography>
      </Button>
      <Button
        variant="contained"
        style={{ maxWidth: '120px', maxHeight: '35px', minWidth: '120px', minHeight: '35px' }}
        sx={{
          padding: '10px',
          backgroundColor: '#efa945',
          '&: hover': {
            backgroundColor: '#efa945',
            color: 'black',
          },
          alignSelf: 'center',
          marginLeft: '20px',
          textTransform: 'none',
        }}
      >
        {dataExport.length > 0 ? (
          <CSVLink
            style={{ textDecoration: 'none', color: 'white' }}
            data={dataExport as Data}
            headers={headerCSV}
            filename="ProductTable"
          >
            <Typography sx={{ fontSize: '13px' }} noWrap>
              Export All:CSV
            </Typography>
          </CSVLink>
        ) : null}
      </Button>
      {btnInfo.isDele ? (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className="modal_content" style={{ backgroundColor: '#323259' }}>
            <div style={{ display: 'flex', color: 'white', justifyContent: 'flex-start', marginBottom: '20px' }}>
              <Typography variant="h6" style={{ margin: 'auto' }}>
                Confirm Delete
              </Typography>
            </div>
            <div style={{ display: 'flex', color: 'white', justifyContent: 'flex-start', marginBottom: '25px' }}>
              <Typography style={{ margin: 'auto' }}>Do you want to delete this product?</Typography>
            </div>
            <div style={{ display: 'flex', color: 'white', justifyContent: 'space-between' }}>
              <Button
                variant="contained"
                sx={{ color: '#ad84ff' }}
                onClick={() => {
                  handleRemovebtn();
                  setIsModalOpen(false);
                }}
              >
                Yes
              </Button>
              <Button variant="contained" sx={{ color: '#ff5880' }} onClick={() => setIsModalOpen(false)}>
                No
              </Button>
            </div>
          </Box>
        </Modal>
      ) : (
        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
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
                  handleSaveBtn();
                  setIsModalOpen(false);
                }}
              >
                Yes
              </Button>
              <Button variant="contained" sx={{ color: '#ff5880' }} onClick={() => setIsModalOpen(false)}>
                No
              </Button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default ProductPageFooter;
