<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->string('platform')->nullable();
            $table->string('link')->nullable();
            $table->date('applicationStatusDate')->nullable();
            $table->string('contactPerson')->nullable();
            $table->date('responseDueDate')->nullable();
            $table->string('applicationType')->nullable();
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->string('followUpStatus')->nullable();
        });
    }
    
    public function down()
    {
        Schema::table('job_applications', function (Blueprint $table) {
            $table->dropColumn([
                'platform', 
                'link', 
                'applicationStatusDate', 
                'contactPerson', 
                'responseDueDate', 
                'applicationType', 
                'location', 
                'notes', 
                'followUpStatus'
            ]);
        });
    }
    
};
