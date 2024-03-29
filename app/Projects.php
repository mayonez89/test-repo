<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Projects extends Model
{
    protected $guarded = ['id'];
    protected $fillable = ['name', 'description', 'live_url', 'stage_url'];

    public function fields() {
        return $this->hasMany(ProjectFields::class, 'project_id');
    }
}
