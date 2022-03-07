import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import Dropzone from 'react-dropzone';
import { Control, Controller } from 'react-hook-form';
import { ProductCreateParam } from '../../../../models/product';

const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    cursor: 'pointer',
    color: '#333',
    padding: '15px',
    border: '1px dotted white',
  },
  icon: {
    color: '#fff',
    fontSize: '55px',
  },
}));

interface Props {
  control: Control<ProductCreateParam, any>;
  nameInput: 'imagesOrder';
}

const DropInput = (props: Props) => {
  const { control, nameInput } = props;
  const [images, setImages] = React.useState<any[]>([]);
  const styles = useStyles();

  const handlePrevImg = (value: File[]) => {
    if (value) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImages((curr) => [...curr, reader.result]);
      });
      reader.readAsDataURL(value[0]);
    }
  };

  const handleRemoveImg = (value: string[], index: number) => {
    setImages((prev) => prev.filter((item, i) => i !== index));
    const newData = value.filter((item, i) => i !== index);
    return newData;
  };

  return (
    <>
      <Controller
        control={control}
        name={nameInput}
        defaultValue={[]}
        rules={{ required: { value: true, message: 'This field is requierd' } }}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Dropzone
                multiple={true}
                onDrop={(file: File[]) => {
                  handlePrevImg(file);
                  onChange([...value, file]);
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className={styles.root} {...getRootProps()}>
                    <CameraAltIcon className={styles.icon} />
                    <input {...getInputProps()} multiple={true} name={nameInput} onBlur={onBlur} />
                  </div>
                )}
              </Dropzone>
              <List style={{ display: 'flex', height: '100%', marginRight: '20px' }}>
                {value.map((f: any, index: number) => (
                  <ListItem key={index} style={{ height: '70px', width: '70px', padding: '0', marginLeft: '10px' }}>
                    <img
                      src={images[index]}
                      style={{ objectFit: 'cover', height: '100%', width: '100%', padding: '0' }}
                    />
                    <div
                      onClick={() => {
                        onChange(handleRemoveImg(value, index));
                      }}
                    >
                      <CancelIcon
                        fontSize="small"
                        style={{ color: 'grey', position: 'absolute', top: '-6px', right: '-5px' }}
                      />
                    </div>
                  </ListItem>
                ))}
              </List>
            </div>
          </>
        )}
      />
    </>
  );
};

export default DropInput;
