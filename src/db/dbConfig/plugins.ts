import mongoose, { Schema, Document } from 'mongoose';
/* eslint-disable no-param-reassign */
export const findOrCreatePlugin = function (schema: Schema): void {
  schema.statics.findOrCreate = async function (condition, doc = null) {
    const res = await this.findOne(condition);
    return res || this.create(doc ?? condition);
  };
};

export const formatJSONPlugin = function (schema: Schema): void {
  schema.options.toJSON = {
    transform(_doc: Document, ret: Document): Document {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;

      if ('password' in ret) {
        delete ret?.password;
      }
      return ret;
    },
    virtuals: true,
  };
};

export const formatObjectPlugin = function (schema: Schema): void {
  schema.options.toObject = {
    transform(_doc: Document, ret: Document): Document {
      ret.id = ret._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    },
    virtuals: true,
  };
};

mongoose.plugin(findOrCreatePlugin);
mongoose.plugin(formatJSONPlugin);
mongoose.plugin(formatObjectPlugin);
