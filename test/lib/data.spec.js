import { firestoreSnapshotToArray, buildCreatePost, buildUpdatePost } from '../../src/lib/data';

global.Date.now = jest.fn(() => 1632232900600);

describe('data.utils', () => {
  it('firestoreSnapshotToArray', () => {
    const snapshot = [
      {
        id: '1',
        data: () => ({ text: 'Texto 1' }),
      },
      {
        id: '2',
        data: () => ({ text: 'Texto 2' }),
      },
      {
        id: '3',
        data: () => ({ text: 'Texto 3' }),
      },
    ];
    expect(firestoreSnapshotToArray(snapshot)).toEqual([
      {
        id: '1',
        text: 'Texto 1',
      },
      {
        id: '2',
        text: 'Texto 2',
      },
      {
        id: '3',
        text: 'Texto 3',
      },
    ]);
  });
  it('buildCreatePost', () => {
    expect(buildCreatePost('Texto')).toEqual({
      dateCreated: new Date('2021-09-21T14:01:40.600Z'),
      text: 'Texto',
    });
  });
  it('buildUpdatePost', () => {
    expect(buildUpdatePost('Texto')).toEqual({
      dateLastEdited: new Date('2021-09-21T14:01:40.600Z'),
      text: 'Texto',
    });
  });
});
