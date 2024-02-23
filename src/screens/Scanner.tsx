/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import {View, Button} from 'react-native';
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {WebView} from 'react-native-webview';

const Scanner = () => {
  const [scanned, setScanned] = useState(false);
  const [webviewUrl, setWebviewUrl] = useState('');

  const onSuccess = (e: any) => {
    setScanned(true);
    setWebviewUrl(e.data);
  };

  const resetScanner = () => {
    setScanned(false);
    setWebviewUrl('');
  };

  return (
    <View style={{flex: 1}}>
      {webviewUrl ? (
        <WebView source={{uri: webviewUrl}} style={{flex: 1}} />
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <QRCodeScanner
            onRead={onSuccess}
            flashMode={RNCamera.Constants.FlashMode.torch}
            reactivate={true}
            reactivateTimeout={2000}
          />
          {scanned && (
            <Button
              title="Scan Again"
              onPress={resetScanner}
              style={{position: 'absolute', bottom: 20}}
            />
          )}
        </View>
      )}
    </View>
  );
};

export default Scanner;
