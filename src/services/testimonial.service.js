import { Testimonial } from '../models/index.js';
import { AppError } from '../utils/apiResponse.js';

export const createTestimonial = async (data) => {
  return await Testimonial.create(data);
};

export const getAllTestimonials = async () => {
  return await Testimonial.findAll();
};

export const getTestimonialById = async (id) => {
  const testimonial = await Testimonial.findByPk(id);
  if (!testimonial) throw new AppError('Testimonial not found', 404);
  return testimonial;
};

export const updateTestimonialStatus = async (id, status) => {
  const testimonial = await getTestimonialById(id);
  return await testimonial.update({ status });
};

export const deleteTestimonial = async (id) => {
  const testimonial = await getTestimonialById(id);
  return await testimonial.destroy();
};
