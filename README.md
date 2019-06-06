Hacked-together tool to synchronize the playback of videos with heart rate and [action unit](https://en.wikipedia.org/wiki/Facial_Action_Coding_System) measurements.

![Screenshot 2019-06-06 at 13 29 30](https://user-images.githubusercontent.com/7422050/59029664-2a08c800-885f-11e9-9d1e-ac3d339accd2.png)

## Data Format

The heart rate and action unit data requires the following JSON format (see [sample-data.json](https://github.com/fawind/vid-sync/blob/master/sample-data.json)):

```json
{
  "heartRate": {
    "data": [1, 2, 3, 4]
  },
  "actionUnits": [
    {
      "name": "AU06",
      "data": [1, 2, 3, 4]
    }
  ]
}
```
