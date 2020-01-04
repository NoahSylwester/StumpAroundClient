const Express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');

export default class App extends React.Component {
    
    
    render() {
        const { photo } = this.state
        return (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            {photo && (
              <React.Fragment>
                <Image
                  source={{ uri: photo.uri }}
                  style={{ width: 300, height: 300 }}
                />
                <Button title="Upload" onPress={this.handleUpload} />
              </React.Fragment>
            )}
            <Button title="Choose Photo" onPress={this.handleChoosePhoto} />
          </View>
        )
      }
    }

const app = Express();
app.use(bodyParser.json());

const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage: Storage });

app.get('/', (req, res) => {
  res.status(200).send('You can post to /api/upload.');
});

app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(3000, () => {
  console.log('App running on http://localhost:3000');
});

handleUploadPhoto = () => {
    fetch('http://localhost:3000/api/upload', {
      method: 'POST',
      body: createFormData(this.state.photo, { userId: '123' }),
    })
      .then(response => response.json())
      .then(response => {
        console.log('upload succes', response);
        alert('Upload success!');
        this.setState({ photo: null });
      })
      .catch(error => {
        console.log('upload error', error);
        alert('Upload failed!');
      });
  };

