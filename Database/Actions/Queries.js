import { getdb } from "../Config/Connection.js";
import { collection } from "../Config/Collection.js";
export const db = {
  // GETTING USER DETAILS WITH USERID
  checkUser: (userid) => {
    return new Promise((resolve, reject) => {
      try {
        getdb()
          .collection(collection.USER_COLLECTION)
          .findOne({ id: userid })
          .then((user) => {
            resolve(user);
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  //SAVING USER DETAILS ON START

  saveUser: (user) => {
    return new Promise((resolve, reject) => {
      try {
        getdb()
          .collection(collection.USER_COLLECTION)
          .findOne({ id: user.id })
          .then((res) => {
            if (res) {
              getdb()
                .collection(collection.USER_COLLECTION)
                .updateOne(
                  { id: user.id },
                  {
                    $set: {
                      first_name: user?.first_name,
                      last_name: user?.last_name,
                      username: user?.username,
                    },
                  }
                )
                .then((stats) => {
                  resolve(stats);
                });
            } else {
              getdb()
                .collection(collection.USER_COLLECTION)
                .insertOne(user)
                .then((status) => {
                  resolve(status);
                });
            }
          });
      } catch (error) {
        console.log(error);
      }
    });
  },

  //GETTING ADD ADMIN DETAILS

  getAdmins: () => {
    return new Promise(async (resolve, reject) => {
      try {
        await getdb()
          .collection(collection.USER_COLLECTION)
          .find({ admin: true })
          .toArray()
          .then((res) => {
            res ? resolve(res) : false;
          });
      } catch (error) {
        error ? resolve(false) : "";
      }
    });
  },

  //ADD NEW ADMIN

  addnewAdmin: (id) => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.USER_COLLECTION)
        .updateOne({ id: id }, { $set: { admin: true } })
        .then((res) => {
          resolve(res);
        });
    });
  },

  // REMOVE ADMIN

  removeAdmin: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        await getdb()
          .collection(collection.USER_COLLECTION)
          .updateOne({ id: id }, { $set: { admin: false } })
          .then((res) => {
            console.log(res);
            resolve(res);
          });
      } catch (e) {
        console.log("e");
      }
    });
  },

  //GETTING ALL FILES DETAILS

  getAllFiles: () => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.FILE_COLLECTION)
        .find({})
        .toArray()
        .then((res) => {
          resolve(res);
        });
    });
  },

  // GETTING ALL USER INFO FOR BOT STATS

  getAllUser: () => {
    return new Promise(async (resolve, reject) => {
      getdb()
        .collection(collection.USER_COLLECTION)
        .find()
        .toArray()
        .then((res) => {
          resolve(res);
        });
    });
  },

  // GETTING ALL BROADCAST POST IN AN ARRAY TO CHECK LENGTH OF DOCS

  getBroadcastPost: () => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.BROADCAST_COLLECTION)
        .find({})
        .toArray()
        .then((res) => {
          resolve(res);
        });
    });
  },

  // SAVING POST DETAILS FOR BROADCAST

  savePost: (post) => {
    getdb()
      .collection(collection.BROADCAST_COLLECTION)
      .createIndex({ id: 1 }, { unique: true, dropDups: true });
    return new Promise((resolve, reject) => {
      getdb()
        .collection(collection.BROADCAST_COLLECTION)
        .insertOne(post)
        .then((res) => {
          resolve(res);
        });
    });
  },

  // SAVING FILES

  saveFile: (fileDetails) => {
    getdb()
      .collection(collection.FILE_COLLECTION)
      .createIndex({ file_name: "text" });
    getdb()
      .collection(collection.FILE_COLLECTION)
      .insertOne(fileDetails)
      .then((res) => {
        console.log("file saved");
      });
  },

  //FETCHING FILES

  getFile: (query) => {
    return new Promise(async (resolve, reject) => {
      getdb()
        .collection(collection.FILE_COLLECTION)
        .findOne({ shortid: query })
        .then((res) => {
          resolve(res);
        });
    });
  },

  // REMOVING FILE WITH FILE ID

  removeFile: (shortid) => {
    return new Promise((resolve, reject) => {
      getdb()
        .collection(collection.FILE_COLLECTION)
        .deleteOne({ shortid: shortid })
        .then((res) => {
          resolve(res);
        });
    });
  },

  // REMOVING ALL FILES BY A PARTICULAR USER

  removeUserFile: (id) => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.FILE_COLLECTION)
        .deleteMany({ userId: id })
        .then((res) => resolve(res));
    });
  },

  //REMOVING THE WHOLE COLLECTION TO REMOVE ALL FILES

  deleteCollection: () => {
    return new Promise((resolve, reject) => {
      getdb()
        .collection(collection.FILE_COLLECTION)
        .deleteMany({})
        .then((res) => {
          resolve(res);
        });
    });
  },

  // BAN USERS WITH USER ID

  banUser: (id) => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { id: id },
          {
            $set: { banStatus: true },
          }
        )
        .then((res) => {
          console.log(res);
          resolve(res);
        });
    });
  },

  // UNBAN USER WITH USER ID

  unBan: (id) => {
    return new Promise(async (resolve, reject) => {
      await getdb()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { id: id },
          {
            $set: { banStatus: false },
          }
        )
        .then((res) => {
          resolve(res);
        });
    });
  },

  // GETTING CUSTOM PROPERTIES

  getcustom: () => {
    return new Promise((resolve, reject) => {
      try {
        getdb()
          .collection(collection.CUSTOM_COLLECTION)
          .findOne({ ADMIN: parseInt(process.env.ADMIN_ID) })
          .then((custom) => {
            resolve(custom);
          });
      } catch (error) {
        console.log(null);
      }
    });
  },

  setCustom: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        getdb()
          .collection(collection.CUSTOM_COLLECTION)
          .findOne({ ADMIN: parseInt(process.env.ADMIN_ID) })
          .then((stats) => {
            if (stats) {
              getdb()
                .collection(collection.CUSTOM_COLLECTION)
                .updateOne(
                  { ADMIN: parseInt(process.env.ADMIN_ID) },
                  {
                    $set: {
                      channelID: data.channelID,
                      channelLink: data.channelLink,
                      welcome: data.welcome,
                    },
                  }
                )
                .then((res) => {
                  resolve(res);
                });
            } else {
              getdb()
                .collection(collection.CUSTOM_COLLECTION)
                .insertOne(data)
                .then((res) => {
                  resolve(res);
                });
            }
          });
      } catch (error) {
        resolve(null);
      }
    });
  },
};
