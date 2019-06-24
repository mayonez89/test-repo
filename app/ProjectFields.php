<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use SebastianBergmann\CodeCoverage\Report\Xml\Project;

class ProjectFields extends Model
{
    protected $fillable = ['key', 'value', 'project_id'];

    public function project() {
        return $this->belongsTo(Project::class);
    }
}
