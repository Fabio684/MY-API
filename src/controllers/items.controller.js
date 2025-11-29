const supabase = require('../services/supabase.service');

const TABLE = 'items';

async function list(req, res, next) {
  try {
    const { data, error } = await supabase.from(TABLE).select('*').order('created_at', { ascending: false });
    if (error) return next(error);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function getById(req, res, next) {
  try {
    const { id } = req.params;
    const { data, error } = await supabase.from(TABLE).select('*').eq('id', id).single();
    if (error || !data) return res.status(404).json({ error: 'Not found' });
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function createItem(req, res, next) {
  try {
    const payload = req.body;
    const { data, error } = await supabase.from(TABLE).insert(payload).select().single();
    if (error) return next(error);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
}

async function updateItem(req, res, next) {
  try {
    const { id } = req.params;
    const payload = req.body;
    const { data, error } = await supabase.from(TABLE).update(payload).eq('id', id).select().single();
    if (error) return next(error);
    res.json(data);
  } catch (err) {
    next(err);
  }
}

async function deleteItem(req, res, next) {
  try {
    const { id } = req.params;
    const { error } = await supabase.from(TABLE).delete().eq('id', id);
    if (error) return next(error);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getById, createItem, updateItem, deleteItem };
