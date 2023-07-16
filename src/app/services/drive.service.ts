import { Injectable } from '@angular/core';

declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {
  private clientId = '710126248036-ebalim6sbeav56oqgtse19eo3qr3igqp.apps.googleusercontent.com';
  private scope = 'https://www.googleapis.com/auth/drive';

  constructor() {}

  async authorize(): Promise<void> {
    await gapi.load('client:auth2', async () => {
      await gapi.client.init({
        clientId: this.clientId,
        scope: this.scope
      });

      await gapi.auth2.getAuthInstance().signIn();
    });
  }

  async saveDataToDrive(data: object): Promise<void> {
    const json = JSON.stringify(data);
    const fileContent = new Blob([json], { type: 'application/json' });

    const fileMetadata = {
      name: 'data.json',
      mimeType: 'application/json'
    };

    const formData = new FormData();
    formData.append('metadata', new Blob([JSON.stringify(fileMetadata)], { type: 'application/json' }));
    formData.append('file', fileContent);
   console.log('kdlxgj')
    await gapi.client.drive.files.create({
      resource: fileMetadata,
      media: {
        mimeType: 'application/json',
        body: fileContent
      },
      fields: 'id'
    });
  }
}
