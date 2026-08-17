import * as testimonialService from '../services/testimonial.service.js';
import asyncHandler from '../utils/asyncHandler.js';
import messages from '../constants/messages.js';

export const createTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.createTestimonial(req.body);
  return res.success(undefined, messages.CREATED, 201);
});

export const getTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getAllTestimonials();
  return res.success(testimonials, messages.FETCHED, 200);
});

export const getActiveTestimonials = asyncHandler(async (req, res) => {
  const testimonials = await testimonialService.getActiveTestimonials();
  return res.success(testimonials, messages.FETCHED, 200);
});

export const getTestimonial = asyncHandler(async (req, res) => {
  const testimonial = await testimonialService.getTestimonialById(req.params.id);
  return res.success(testimonial, messages.FETCHED, 200);
});

export const updateTestimonialStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  await testimonialService.updateTestimonialStatus(req.params.id, status);
  return res.success(undefined, messages.UPDATED, 200);
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
  await testimonialService.deleteTestimonial(req.params.id);
  return res.success(undefined, messages.DELETED, 200);
});
