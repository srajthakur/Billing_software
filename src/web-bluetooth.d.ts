// interface BluetoothDevice extends EventTarget {
//   id: string;
//   name?: string;
//   gatt?: BluetoothRemoteGATTServer;
// }

// interface BluetoothRemoteGATTServer {
//   connect(): Promise<BluetoothRemoteGATTServer>;
//   getPrimaryService(service: BluetoothServiceUUID): Promise<BluetoothRemoteGATTService>;
// }

// interface BluetoothRemoteGATTService {
//   getCharacteristic(characteristic: BluetoothCharacteristicUUID): Promise<BluetoothRemoteGATTCharacteristic>;
// }

// interface BluetoothRemoteGATTCharacteristic {
//   writeValue(value: BufferSource): Promise<void>;
// }

// type BluetoothServiceUUID = string;
// type BluetoothCharacteristicUUID = string;
