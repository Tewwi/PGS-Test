import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CancelIcon from '@mui/icons-material/Cancel';
import { List, ListItem } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useEffect, useState } from 'react';
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
  nameInput: 'imgUpload';
  dataDefault?: ProductCreateParam;
  handleDeleImg?: (id: number) => void;
}

const DropInput = (props: Props) => {
  const { control, nameInput, dataDefault } = props;
  const [images, setImages] = useState<any[]>([]);
  const [imgId, setImgId] = useState<number[]>([]);
  const [valueUpload, setValueUpload] = useState<any[]>([]);
  const required = { required: { value: true, message: 'This field is requierd' } };
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

  const handleRemoveImg = (value: File[], index: number) => {
    setImages((prev) => prev.filter((_item, i) => i !== index));
    const newData = value.filter((_item, i) => i !== index);
    if (dataDefault && props.handleDeleImg && imgId[index]) {
      props.handleDeleImg(imgId[index]);
      setImgId((prev) => prev.filter((item) => item !== imgId[index]));
    }
    return newData;
  };

  const handleValueUpload = (file: File[]) => {
    const result = [...valueUpload, file];
    setValueUpload((prev) => [...prev, file]);
    console.log(result);
    return result;
  };

  useEffect(() => {
    if (dataDefault && dataDefault.images[0]) {
      setImages(() => {
        const temp = dataDefault.images.map((item) => {
          return item.thumbs[1];
        });
        return temp;
      });
      setImgId(dataDefault.images.map((item) => +item.id));
    }
    return;
  }, [dataDefault]);

  return (
    <>
      <Controller
        control={control}
        name={nameInput}
        defaultValue={images}
        rules={dataDefault ? {} : required}
        render={({ field: { onChange, onBlur, value } }) => (
          <>
            <div style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <Dropzone
                multiple={true}
                onDrop={(file: File[]) => {
                  handlePrevImg(file);
                  onChange(handleValueUpload(file));
                }}
              >
                {({ getRootProps, getInputProps }) => (
                  <div className={styles.root} {...getRootProps()}>
                    <CameraAltIcon className={styles.icon} />
                    <input {...getInputProps()} multiple={true} name={nameInput} onBlur={onBlur} type="file" />
                  </div>
                )}
              </Dropzone>
              <List style={{ display: 'flex', height: '100%', marginRight: '20px' }}>
                {images.map((f: any, index: number) => (
                  <ListItem key={index} style={{ height: '70px', width: '70px', padding: '0', marginLeft: '10px' }}>
                    <img src={f} style={{ objectFit: 'cover', height: '100%', width: '100%', padding: '0' }} />
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
